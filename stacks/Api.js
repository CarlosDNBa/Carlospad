
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

    this.api = new sst.Api(this, 'api', {
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
      }
    });

    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
