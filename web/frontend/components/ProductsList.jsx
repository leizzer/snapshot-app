import {
  LegacyCard,
  ResourceList,
  ResourceItem,
  Text,
  SkeletonBodyText
} from '@shopify/polaris';
import React from 'react';

export function ProductsList({products, isLoading}) {
  console.log('ProductsList', products);

  return (
    <LegacyCard sectioned>
      <Text variant="headingMd" as="h2">
        Products
      </Text>
      {isLoading ? (
        <SkeletonBodyText />
      ) : (
        <ResourceList
          resourceName={{singular: 'product', plural: 'products'}}
          items={products}
          renderItem={(item) => {
            const {shopify_product_id, title, product_type, shopify_created_at} = item;

            return (
              <ResourceItem
                id={shopify_product_id}
                key={shopify_product_id}
              >
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                  {title}
                </Text>
                <div>
                  Created: {shopify_created_at}
                </div>
              </ResourceItem>
            );
          }}
          showHeader
          totalItemsCount={products.length}
        />
      )}
    </LegacyCard>
  );
}
