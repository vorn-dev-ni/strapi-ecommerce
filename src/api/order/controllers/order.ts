import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      const { orderItemList } = ctx.request.body?.data || {};

      console.log("Incoming body:", ctx.request.body);

      // Validate orderItemList exists and is array
      if (!orderItemList || !Array.isArray(orderItemList)) {
        return ctx.badRequest("Missing or invalid orderItemList in request");
      }

      // Process each item: validate and deduct stock
      for (const [index, item] of orderItemList.entries()) {
        const variantId = item.product_variant; // Expect number ID here
        const orderedQty = item.qty;

        if (!variantId || typeof orderedQty !== "number") {
          console.error(`❌ Invalid variantId or qty at index ${index}`, item);
          return ctx.badRequest("Invalid product_variant or qty");
        }

        // Fetch current stock quantity for product variant
        const variant = await strapi.entityService.findOne(
          "api::product-variant.product-variant",
          variantId,
          { fields: ["qty"] }
        );

        if (!variant) {
          return ctx.badRequest(
            `Product variant with ID ${variantId} not found`
          );
        }

        if (variant.qty < orderedQty) {
          return ctx.badRequest(
            `Insufficient stock for variant ID ${variantId}`
          );
        }

        // Deduct stock quantity
        await strapi.entityService.update(
          "api::product-variant.product-variant",
          variantId,
          {
            data: {
              qty: variant.qty - orderedQty,
            },
          }
        );
      }

      // After updating stock, create the order normally
      const response = await super.create(ctx);

      return response;
    },
  })
);
