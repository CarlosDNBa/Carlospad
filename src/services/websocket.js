import { putItem, deleteItem, query } from './ddbv2';
import { postToConnection } from './api-gateway';

export const startConnection = async (connectionId, link, connId) => {
  const params = {
    TableName: process.env.CONNECTIONS_TABLE_NAME,
    Item: {
      pk: 'connection',
      sk: connectionId,
      id: connectionId,
      connId,
      link,
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

export const getConnectionsByLink = async ({ link, connId }) => {
  const params = {
    TableName: process.env.CONNECTIONS_TABLE_NAME,
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: {
      ':pk': 'connection'
    }
  };

  const response = await query(params);
  return response.Items.filter((currItem) => currItem.link === link && currItem.connId !== connId);
};

export const broadcastMessageToOne = async ({ connectionId, message }) => {
  await postToConnection({
    connectionId: connectionId,
    message: JSON.stringify(message)
  });
};


export const broadcastMessageToOtherLinks = async ({ message, link, connId }) => {
  const connections = await getConnectionsByLink({ link, connId });

  const promises = connections.map(({ id }) => broadcastMessageToOne({
    connectionId: id,
    message: message
  }));
  await Promise.all(promises);
};
