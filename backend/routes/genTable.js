import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import AWS from 'aws-sdk';
import { MainTable } from '../config.js';


const genTable = express.Router();

var dynamodb = new AWS.DynamoDB();

var tableparams = {
    //changed tablename to MainTable, titles 'main'
    TableName: MainTable,
    AttributeDefinitions: [
      { 
        AttributeName: 'PK', 
        AttributeType: 'S', 
      },
      { 
        AttributeName: 'SK', 
        AttributeType: 'S',
      },
      {
        AttributeName: 'email',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'PK',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'SK',
        KeyType: 'RANGE',
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
    //added GSI
    GlobalSecondaryIndexes: [
      {
        IndexName: 'email_partition',
        KeySchema: [
          {
            AttributeName: 'email',
            KeyType: 'HASH'
          }
        ],
        Projection: {
          ProjectionType: 'INCLUDE',
          NonKeyAttributes: ['PK', 'password']
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ],
  };

  genTable.get('/',
  expressAsyncHandler(async (req, res) => {
    try {
        await dynamodb
        .deleteTable({ TableName: MainTable }, function(err, data) {
            if (err) {
                console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
            }
        });
    } catch {
        console.log(error);
    }
    try {
        await dynamodb
        .createTable(tableparams, function(err, data) {
            if (err) {
            console.log("Error", err);
            } else {
            console.log("Table Created", data);
            }
        });
    } catch {
        console.log(error);
    }
}))

export { genTable };