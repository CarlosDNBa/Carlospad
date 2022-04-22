import AWS from 'aws-sdk';
import debug from 'debug';
import { endConnection } from './websocket';

export const postToConnection = async ({ connectionId, message }) => {
  const wsApiG = process.env.WEBSOCKET_API_GATEWAY_URL.replace('wss://', '');

  const client = new AWS.ApiGatewayManagementApi({
    endpoint: wsApiG,
  });
  try {
    const body = {
      ConnectionId: connectionId,
      Data: message
    };
    const response = await client.postToConnection(body).promise();
    debug(`${process.env.PROJECT_NAME}:services:api-gateway:postToConnection`)('response %o', response);
    return response;
  } catch (e) {
    if (e.statusCode === 410) await endConnection(connectionId);
    else throw new Error(e);
  }
};
