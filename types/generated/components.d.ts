import type { Attribute, Schema } from '@strapi/strapi';

export interface CartItemCartItem extends Schema.Component {
  collectionName: 'components_cart_item_cart_items';
  info: {
    displayName: 'cart-item';
    icon: 'archive';
  };
  attributes: {
    product_variant: Attribute.Relation<
      'cart-item.cart-item',
      'oneToOne',
      'api::product-variant.product-variant'
    >;
    qty: Attribute.Integer;
  };
}

export interface OrderItemsOrderItems extends Schema.Component {
  collectionName: 'components_order_items_order_items';
  info: {
    description: '';
    displayName: 'OrderItems';
    icon: 'cube';
  };
  attributes: {
    price: Attribute.Decimal;
    product_variant: Attribute.Relation<
      'order-items.order-items',
      'oneToOne',
      'api::product-variant.product-variant'
    >;
    qty: Attribute.Integer;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'cart-item.cart-item': CartItemCartItem;
      'order-items.order-items': OrderItemsOrderItems;
    }
  }
}
