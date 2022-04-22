import { getTextByLink, saveText } from '../services/text';
import { broadcastMessageToOtherLinks } from '../services/websocket';

export const save = async (event) => {
  const { link, text, connId } = JSON.parse(event.body);

  // Check if there has been any change to the text
  const { text: existentText } = await getTextByLink(link);
  if (existentText !== text) {
    await saveText({ link, text });
    await broadcastMessageToOtherLinks({
      link,
      connId,
      message: { message: 'text updated', text }
    });
  }
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

  const data = await getTextByLink(link);

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

  await saveText({ link, text: '' });

  return {
    statusCode: 201,
  };
};

