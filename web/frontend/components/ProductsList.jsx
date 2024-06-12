import { useEffect } from 'react';
import {
  LegacyCard,
  ResourceList,
  ResourceItem,
  Text,
  Thumbnail
} from '@shopify/polaris';
import React from 'react';

export function ProductsList({ products, isLoading, selectedProducts, setSelectedProducts }) {
  useEffect(() => {
    // Selecting all Items after loading
    if (isLoading === false) {
      setSelectedProducts(products.map((product) => product.shopify_product_id));
    }
  }, [isLoading]);

  // This is a hack because Vite runs in StrictMode and ResourceList is not compatible with it
  const setSelectedItemsX = (selected) => {
    if (selected.length === products.length) {
      setSelectedProducts(products.map((product) => product.shopify_product_id));
    } else {
      setSelectedProducts(selected);
    }
  };

  return (
    <LegacyCard sectioned>
      <Text variant="headingMd" as="h2">
        Products
      </Text>
      <ResourceList
        loading={isLoading}
        resourceName={{ singular: 'product', plural: 'products' }}
        items={products}
        selectable
        selectedItems={selectedProducts}
        onSelectionChange={setSelectedItemsX}
        renderItem={(item) => {
          const { shopify_product_id, title, shopify_created_at, thumbnail_url } = item;
          const thumbnail = <Thumbnail source={thumbnail_url || ""} size="small" />;

          return (
            <ResourceItem
              id={shopify_product_id}
              media={thumbnail}
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
    </LegacyCard>
  );
}
