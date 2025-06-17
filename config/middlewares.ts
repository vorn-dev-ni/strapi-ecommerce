export default [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:", "http:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "cdn.jsdelivr.net",
            "strapi.io",
            "dl.airtable.com",
            "res.cloudinary.com", // Cloudinary
            "lh3.googleusercontent.com", // Google avatars
            "platform-lookaside.fbsbx.com", // Facebook avatars
            `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`, // S3 direct
            `https://${process.env.AWS_CLOUDFRONT_URL}`, // CloudFront CDN
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "cdn.jsdelivr.net",
            "strapi.io",
            "dl.airtable.com",
            `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
            `https://${process.env.AWS_CLOUDFRONT_URL}`, // CloudFront CDN
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
