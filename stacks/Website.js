import { Stack, StaticSite } from "@serverless-stack/resources";

export default class Website extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const tld = process.env.TLD
    const domain = scope.stage === 'live'
      ? tld
      : `${scope.stage}.${tld}`

    const { url } = new StaticSite(this, "www", {
      path: "www",
      customDomain: domain
    });

    // Show the URLs in the output
    this.addOutputs({
      SiteUrl: url,
    });
  }
}
