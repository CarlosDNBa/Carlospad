import { putItem, query } from './ddbv2';

const tableName = process.env.TABLE_NAME;

export const getTextByLink = async (link) => {
  const response = await query({
    TableName: tableName,
    KeyConditionExpression: 'link = :link',
    ExpressionAttributeValues: { ':link': link }
  });
  return response.Items[0];
};

export const saveText = async ({ text, link }) => {
  const response = await putItem({
    TableName: tableName,
    Item: {
      text,
      link
    }
  });
  return response;
};
