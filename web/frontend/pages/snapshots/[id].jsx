import { useState } from 'react';
import { ProductsList } from "../../components";
import { Card, Page, Layout, SkeletonBodyText, Text } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";
import { useParams, useNavigate } from 'react-router-dom';

export default function SnapshotPage() {
  const [snapshot, setSnapshot] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <Page>
      <TitleBar
        title={"Snapshot"}
        primaryAction={{
          content: "Delete",
          onAction: handleDelete,
          destructive: true
        }}
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
