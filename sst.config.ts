/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-stream-test",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          // region: "us-west-1",
          // region: "us-east-1",
          region: "ap-southeast-1",
        },
      },
    };
  },
  async run() {
    const reg = $app.providers!.aws.region;
    const domainName =
      reg === "us-west-1"
        ? "stream-test-west.mckamyk.io"
        : reg === "ap-southeast-1"
        ? "stream-test-ap.mckamyk.io"
        : "stream-test.mckamyk.io";
    new sst.aws.Remix("MyWeb", {
      domain: {
        name: domainName,
        dns: sst.aws.dns({
          zone: "Z03383253DRRF3ZSA5C6K",
        }),
      },
    });
  },
});
