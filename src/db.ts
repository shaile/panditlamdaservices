/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export default dynamoDB;
