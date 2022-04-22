import { Stack, ReactStaticSite } from "@serverless-stack/resources";

export default class Website extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);


    const { url } = new ReactStaticSite(this, "website", {
      path: "app",
      environment: {
        REACT_APP_API_GATEWAY_URL: props.domains.api,
        REACT_APP_WS_URL: props.domains.ws,
      },
      customDomain: {
        hostedZone: props.tld,
        domainName: props.domains.website
      }
    });

    // Show the URLs in the output
    this.addOutputs({
      SiteUrl: url,
    });
  }
}
