import { useState, useCallback } from 'react';
import { ProductsList } from "../../components";
import { Card, Page, Layout, SkeletonBodyText, Text, Spinner } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";
import { useParams, useNavigate } from 'react-router-dom';

export default function SnapshotPage() {
  const [snapshot, setSnapshot] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRestoring, setIsRestoring] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const fetch = useAuthenticatedFetch();

  useAppQuery({
    url: "/api/snapshots/" + id,
    reactQueryOptions: {
      onSuccess: (data) => {
        setIsLoading(false);
        setSnapshot(data.data);
      },
    },
  });

  const productIDsFromSelect = () => (
    snapshot.products.reduce((ids, product) => {
      if (selectedProducts.includes(product.shopify_product_id)) {
        ids.push(product.id)
      }
      return ids
    }, [])
  );

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await fetch("/api/snapshots/" + id, { method: "DELETE" });

    if (response.ok) {
      navigate("/snapshots");
    } else {
      setIsLoading(false);
    }
  }

  const handleRestore = async () => {
    setIsRestoring(true);
    const response = await fetch("/api/snapshots/" + id + "/restore", {
      method: "POST",
      body: JSON.stringify({
        data: {
          product_ids: productIDsFromSelect()
        }
      }),
    });

    if (response.ok) {
      setIsRestoring(false);
    } else {
      setIsRestoring(false);
    }
  };

  const handleSelection = useCallback(
    setSelectedProducts,
    []
  );

  return (
    <Page>
      <TitleBar
        title={"Snapshot"}
        primaryAction={{
          content: "Delete",
          onAction: handleDelete,
          destructive: true,
          disabled: isRestoring
        }}
        secondaryActions={[
          {
            content: "Restore",
            onAction: handleRestore,
            disabled: isRestoring
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          {isLoading ? (
            <SkeletonBodyText />
          ) : (
            <>
              <Card sectioned>
                <Text variant="headingMd" as="h2">
                  {snapshot.name}
                  {isRestoring ? <Spinner size="small" /> : null}
                </Text>
              </Card>
              <ProductsList
                products={snapshot.products}
                isLoading={isLoading}
                selectedProducts={selectedProducts}
                setSelectedProducts={handleSelection}
              />
            </>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
};
