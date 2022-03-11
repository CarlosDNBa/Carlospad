import Api from "./Api";
import Storage from "./Storage";
import Website from "./Website";

export default function main(app) {
  const { table } = new Storage(app, "storage");
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    timeout: 30,
    runtime: 'nodejs14.x',
    environment: {
      TABLE_NAME: table.tableName,
      PROJECT_NAME: app.name,
      STAGE: app.stage
    }
  });
  app.addDefaultFunctionPermissions([table]);

  new Api(app, "api");
  new Website(app, "www");
}
