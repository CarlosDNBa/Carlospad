import debug from 'debug';
import { startConnection, endConnection } from './services/websocket';

export const connect = async ({ requestContext: { connectionId }, queryStringParameters: { link, connId } }) => {
  debug(`${process.env.PROJECT_NAME}:websocket:connect`)('connectionId %o link %o connId %o', connectionId, link, connId);
  await startConnection(connectionId, link, connId);
  return { statusCode: 200, body: 'Connected' };
};

export const disconnect = async ({ requestContext: { connectionId } }) => {
  debug(`${process.env.PROJECT_NAME}:websocket:disconnect`)(`Disconnecting ${connectionId}`);
  await endConnection(connectionId);
  return { statusCode: 200, body: 'Disconnected' };
};
