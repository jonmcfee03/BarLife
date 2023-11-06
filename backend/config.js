import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const db = new AWS.DynamoDB.DocumentClient();

const MainTable = 'main';

const EmailTable = 'email_partition';

export { db, MainTable, EmailTable };