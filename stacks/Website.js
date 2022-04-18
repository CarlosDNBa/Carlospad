import { Stack, ReactStaticSite } from "@serverless-stack/resources";

export default class Website extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const tld = process.env.TLD

    const { url } = new ReactStaticSite(this, "website", {
      path: "app",
      environment: {
        REACT_APP_API_GATEWAY_URL: props.apiUrl,
      },
      customDomain: scope.stage === 'live' ? tld : undefined,
    });

    // Show the URLs in the output
    this.addOutputs({
      SiteUrl: url,
    });
  }
}
