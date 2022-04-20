import { DynamoDB } from 'aws-sdk'

const ddb = new DynamoDB.DocumentClient()

export const putItem = async params => await ddb.put(params).promise();

export const deleteItem = async params => await ddb.delete(params).promise();

export const query = async params => await ddb.query(params).promise();
