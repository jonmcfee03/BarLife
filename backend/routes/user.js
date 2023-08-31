import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
//import { isAuth, generateToken } from '../utils.js';
import { db, MainTable, EmailTable } from '../config.js';
import { v4 as uuidv4 } from 'uuid';

const user = express.Router();

user.post('/signup', 
expressAsyncHandler(async (req, res) => {
    try {
        const queryParams = {
            TableName: MainTable,
            IndexName: EmailTable,
            KeyConditionExpression: 'email = :emailValue',
            ExpressionAttributeValues: {
                ':emailValue': req.body.email,
            },
        };
        let queryResponse = await db.query(queryParams).promise();
        if (queryResponse.Items.length > 0) {
            console.log("Email already exists");
            res.send({
                success: false,
                message: "Email already exists",
            });
        } else {
            const uuid = uuidv4();
            const salt = bcrypt.genSaltSync(12);
            const Items = {
                PK: 'USER#' + uuid,
                SK: '#METADATA#' + uuid,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, salt),
                username: req.body.username,
            };

            const params = {
                TableName: MainTable,
                IndexName: EmailTable,
                Item: Items,
                ConditionExpression: 'attribute_not_exists(PK)'
            };

            await db.put(params).promise();

            res.send({
                success: true,
                message: req.body.email + " signed up",
            });
        }
    } catch {
        console.log("Error: ", error);
        res.send({
            success: false,
            error: error,
        });
    }
}));

user.post('/signin',
expressAsyncHandler(async (req, res) => {
    try {
        console.log(req.body.password);
        const queryParams = {
            TableName: MainTable,
            IndexName: EmailTable,
            KeyConditionExpression: 'email = :emailValue',
            ExpressionAttributeValues: {
                ':emailValue': req.body.email,
            }
        }
        let queryResponse = await db.query(queryParams).promise();
        if (queryResponse.Items.length == 1) {
            if (await bcrypt.compare(req.body.password, queryResponse.Items[0].password)) {
                console.log('true');
                console.log("success");
                res.send({
                    success: true,
                    message: "signed in successfully",
                    //need to add middleware
                });
            }
            else {
                console.log("failure");
                res.send({
                    success: false,
                    message: "did not find email/password combination"
                })
            }
        }
        else {
            console.log("failure");
            res.send({
                success: false,
                message: "did not find email/password combination"
            })
        }
    } catch {
        console.log("Error: ", error);
        res.send({
            success: false,
            error: error,
        });
    }
}));

export { user };