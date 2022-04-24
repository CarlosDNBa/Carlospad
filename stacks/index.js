import { RemovalPolicy } from "aws-cdk-lib";
import Api from "./Api";
import Storage from "./Storage";
import Website from "./Website";

export default function main(app) {
  const tld = process.env.TLD;
  const domains = {
    website: app.stage === 'live'
      ? tld
      : `${app.stage}.${tld}`,
    api: app.stage === 'live'
      ? `api.${tld}`
      : `${app.stage}.api.${tld}`
  };

  const { table, connectionsTable } = new Storage(app, "storage");

  // Remove all resources when the dev stage is removed
  if (app.stage !== "live") {
    app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY);
  }

  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    timeout: 30,
    runtime: 'nodejs14.x',
    environment: {
      TABLE_NAME: table.tableName,
      CONNECTIONS_TABLE_NAME: connectionsTable.tableName,
      DEBUG: `${app.name}:*`,
      PROJECT_NAME: app.name,
      STAGE: app.stage
    }
  });
  app.addDefaultFunctionPermissions([table, connectionsTable, 'execute-api:*']);

  const { ws } = new Api(app, "api", { tld, domains });
  new Website(app, "www", { tld, domains: { ...domains, ws: ws.url } });
}
