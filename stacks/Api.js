
import * as sst from '@serverless-stack/resources';

export default class Api extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { stackName } = this;

    const healthCheck = new sst.Function(this, 'HealthCheck', {
      functionName: `${stackName}-health-check`,
      handler: 'src/handlers.healthCheck'
    });

    const load = new sst.Function(this, 'Load', {
      functionName: `${stackName}-load`,
      handler: 'src/handlers.load'
    });

    const save = new sst.Function(this, 'Save', {
      functionName: `${stackName}-save`,
      handler: 'src/handlers.save'
    });

    new sst.Api(this, 'rest', {
      cors: true,
      routes: {
        'GET /health-check': {
          function: healthCheck
        },
        'POST /load': {
          function: load
        },
        'POST /save': {
          function: save
        }
      },
      customDomain: {
        hostedZone: props.tld,
        domainName: props.domains.api
      }
    });

    const wsApi = new sst.WebSocketApi(this, 'ws', {
      routes: {
        $connect: 'src/websocket.connect',
        $disconnect: 'src/websocket.disconnect'
      },
    });

    this.addOutputs({
      RestApiEndpoint: props.domains.api,
      WebsocketApiEndpoint: wsApi.url
    });
  }
}
