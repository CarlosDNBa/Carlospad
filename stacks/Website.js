import { Stack, StaticSite } from "@serverless-stack/resources";

export default class Website extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const tld = process.env.TLD

    const { url } = new StaticSite(this, "www", {
      path: "www",
      customDomain: scope.stage === 'live' ? tld : undefined,
    });

    // Show the URLs in the output
    this.addOutputs({
      SiteUrl: url,
    });
  }
}
