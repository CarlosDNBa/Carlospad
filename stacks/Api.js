import * as sst from '@serverless-stack/resources';

export default class Api extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { stackName } = this;

    this.ws = new sst.WebSocketApi(this, 'ws', {
      routes: {
        $connect: 'src/handlers/websocket.connect',
        $disconnect: 'src/handlers/websocket.disconnect'
      },
    });

    const healthCheck = new sst.Function(this, 'HealthCheck', {
      functionName: `${stackName}-health-check`,
      handler: 'src/handlers/health-check.healthCheck'
    });

    const load = new sst.Function(this, 'Load', {
      functionName: `${stackName}-load`,
      handler: 'src/handlers/text.load',
      environment: {
        WEBSOCKET_API_GATEWAY_URL: this.ws.url
      }
    });

    const save = new sst.Function(this, 'Save', {
      functionName: `${stackName}-save`,
      handler: 'src/handlers/text.save',
      environment: {
        WEBSOCKET_API_GATEWAY_URL: this.ws.url
      }
    });


    this.rest = new sst.Api(this, 'rest', {
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

    this.addOutputs({
      RestApiEndpoint: props.domains.api,
      WebsocketApiEndpoint: this.ws.url
    });
  }
}
