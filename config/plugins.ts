export default ({ env }) => {
  return {
    upload: {
      config: {
        sizeLimit: 5 * 1024 * 1024,
        provider: "@strapi/provider-upload-aws-s3",
        providerOptions: {
          baseUrl: `https://${env("AWS_CLOUDFRONT_URL")}`,
          s3Options: {
            credentials: {
              accessKeyId: env("AWS_ACCESS_KEY_ID"),
              secretAccessKey: env("AWS_ACCESS_SECRET"),
            },
            region: env("AWS_REGION"),
            params: {
              Bucket: env("AWS_BUCKET"),
              ACL: "public-read",
            },
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  };
};
