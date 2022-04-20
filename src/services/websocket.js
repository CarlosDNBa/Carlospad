import { putItem, deleteItem, query } from './ddbv2';
import { postToConnection } from './api-gateway';

export const startConnection = async connectionId => {
  const params = {
    TableName: process.env.CONNECTIONS_TABLE_NAME,
    Item: {
      pk: 'connection',
      sk: connectionId,
      id: connectionId,
    }
  };

  const response = await putItem(params);
  return response;
};

export const endConnection = async connectionId => {
  const params = {
    TableName: process.env.CONNECTIONS_TABLE_NAME,
    Key: {
      pk: 'connection',
      sk: connectionId,
    }
  };

  const response = await deleteItem(params);
  return response;
};

export const getConnections = async () => {
  const params = {
    TableName: process.env.CONNECTIONS_TABLE_NAME,
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: {
      ':pk': 'connection'
    }
  };

  const response = await query(params);
  return response.Items;
};

export const broadcastMessageToAll = async ({ message }) => {
  const connections = await getConnections();

  const promises = connections.map(({ id }) => postToConnection({
    connectionId: id,
    message: JSON.stringify(message)
  }));
  await Promise.all(promises);
};
