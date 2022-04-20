import debug from 'debug';
import { startConnection, endConnection } from './services/websocket';

export const connect = async ({ requestContext: { connectionId } }) => {
  debug(`${process.env.STACK_NAME}:websocket:connect`)(`Connecting ${connectionId}`);
  await startConnection(connectionId);
  return { statusCode: 200, body: 'Connected' };
};

export const disconnect = async ({ requestContext: { connectionId } }) => {
  debug(`${process.env.STACK_NAME}:websocket:disconnect`)(`Disconnecting ${connectionId}`);
  await endConnection(connectionId);
  return { statusCode: 200, body: 'Disconnected' };
};
