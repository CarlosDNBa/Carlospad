import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { DynamoDBClient, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});
const tableName = process.env.TABLE_NAME;

// Adding ddb services
export const PutItem = (item) => client.send(new PutItemCommand({
  TableName: tableName,
  Item: marshall(item)
}));

export const Query = async link => {
  const query = {
    TableName: tableName,
    KeyConditionExpression: 'link = :link',
    ExpressionAttributeValues: marshall({ ':link': link }),
  };

  const { Items } = await client.send(new QueryCommand(query));
  if (Items[0]) return unmarshall(Items[0]);
};
