import { useState } from 'react';
import { ProductsList } from "../../components";
import { Card, Page, Layout, SkeletonBodyText, Text, ResourceList, ResourceItem } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { useAppQuery } from "../../hooks";
import { useParams } from 'react-router-dom';

export default function SnapshotPage() {
  const [snapshot, setSnapshot] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

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

  return (
    <Page>
      <TitleBar title={"Snapshot"} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            {isLoading ? (
              <SkeletonBodyText />
            ) : (
              <>
              <Text variant="headingMd" as="h2">
                {snapshot.name}
              </Text>

              <ProductsList products={snapshot.products} isLoading={isLoading} />
              </>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
