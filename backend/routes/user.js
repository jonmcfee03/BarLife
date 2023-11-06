import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { db, MainTable, EmailTable } from '../config.js';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import now from 'lodash';

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

            const user = { 
                uuid: uuid,
                username: username,
                iat: now(),
                exp: now() + (60 * 60 * 24),
            }

            const accessToken = signJWT(user);

            res.send({
                success: true,
                message: req.body.email + " signed up",
                accessToken: accessToken,
                tokenType: "Bearer",
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

                const mainTableQueryParams = {
                    TableName: MainTable,
                    KeyConditionExpression: 'PK = :PKValue AND SK = :SKValue',
                    ExpressionAttributeValues: {
                        ':PKValue': queryResponse.Items[0].PK,
                        ':SKValue': queryResponse.Items[0].SK,
                    }
                }

                const mainTableQueryResponse = await db.query(mainTableQueryParams).promise();

                const time = Math.floor(Date.now() / 1000);

                const user = { 
                    uuid: mainTableQueryResponse.Items[0].PK,
                    username: mainTableQueryResponse.Items[0].username,
                    iat: time,
                    exp: time + (60 * 60 * 24),
                }

                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

                res.send({
                    success: true,
                    message: "signed in successfully",
                    accessToken: accessToken,
                    tokenType: "Bearer",
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
        res.status(500).send({
            success: false,
            error: "An error occurred during sign-in",
        });
    }
}));

export { user };