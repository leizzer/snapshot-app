import { useState } from 'react';
import { ProductsList } from "../../components";
import { Card, Page, Layout, SkeletonBodyText, Text, Spinner } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";
import { useParams, useNavigate } from 'react-router-dom';

export default function SnapshotPage() {
  const [snapshot, setSnapshot] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRestoring, setIsRestoring] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const fetch = useAuthenticatedFetch();

  const {
    refetch: refetchSnapshots,
  } = useAppQuery({
    url: "/api/snapshots/" + id,
    reactQueryOptions: {
      onSuccess: (data) => {
        setIsLoading(false);
        setSnapshot(data.data);
      },
    },
  });

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await fetch("/api/snapshots/" + id, { method: "DELETE" });

    if (response.ok) {
      navigate("/snapshots");
    } else {
      setIsLoading(false);
    }
  }

  const handleRestore = async (ids) => {
    setIsRestoring(true);
    const response = await fetch("/api/snapshots/" + id + "/restore", {
      method: "POST",
      body: JSON.stringify({ data: { product_ids: ids } }),
    });

    if (response.ok) {
      setIsRestoring(false);
    } else {
      setIsRestoring(false);
    }
  };

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
            onAction: () => handleRestore(
              snapshot.products.map((product) => product.id)
            ),
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
              <ProductsList products={snapshot.products} isLoading={isLoading} />
            </>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
};
