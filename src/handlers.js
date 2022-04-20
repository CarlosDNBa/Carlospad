import { PutItem, Query } from './dynamodb';
import { broadcastMessageToAll } from './services/websocket';

export const healthCheck = (event, context, callback) => callback(null, {
  statusCode: 200,
  body: JSON.stringify({
    health: true,
  }),
});

export const save = async (event) => {
  const { link, text } = JSON.parse(event.body);
  const { stage, domainName } = event.requestContext;

  await PutItem({ link, text });
  await broadcastMessageToAll({
    stage,
    domainName,
    message: { message: 'text updated', text }
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};

export const load = async (event) => {
  const { link } = JSON.parse(event.body);

  const data = await Query(link);

  if (data) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        data: data.text,
      }),
    };
  }

  await PutItem({ link, text: '' });

  return {
    statusCode: 201,
  };
};

