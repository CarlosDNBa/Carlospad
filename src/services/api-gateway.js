import AWS from 'aws-sdk';
import { endConnection } from './websocket';

const wsApiG = process.env.WEBSOCKET_API_GATEWAY_URL.replace('wss://', '');

export const client = new AWS.ApiGatewayManagementApi({
  endpoint: wsApiG,
});

export const postToConnection = async ({ connectionId, message }) => {
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
