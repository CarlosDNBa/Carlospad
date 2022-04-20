import AWS from 'aws-sdk';
import { endConnection } from './websocket';

export const clientByEndpoint = endpoint => new AWS.ApiGatewayManagementApi({
  endpoint,
});

export const postToConnection = async ({ endpoint, connectionId, message }) => {
  const client = clientByEndpoint(endpoint);
  try {
    const body = {
      ConnectionId: connectionId,
      Data: message
    };
    const response = await client.postToConnection(body).promise();
    return response;
  } catch (e) {
    if (e.statusCode === 410) await endConnection(connectionId);
    else throw new Error(e);
  }
};
