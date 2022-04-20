import * as sst from '@serverless-stack/resources';

export default class Table extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    this.table = new sst.Table(this, 'text', {
      fields: {
        link: 'string'
      },
      primaryIndex: { partitionKey: 'link' }
    });

    this.connectionsTable = new sst.Table(this, 'connections', {
      fields: {
        pk: 'string',
        sk: 'string',
        id: 'string'
      },
      primaryIndex: { partitionKey: 'pk', sortKey: 'sk' },
    });
  }
}
