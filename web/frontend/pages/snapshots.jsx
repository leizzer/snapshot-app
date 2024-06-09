
import { useState } from "react";
import { Card, Page, Layout, SkeletonBodyText, Text,
  ResourceList,
  ResourceItem,
} from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { useAppQuery } from "../hooks";

export default function SnapshotsPage() {
  const [snapshots, setSnapshots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    refetch: refetchSnapshots,
  } = useAppQuery({
    url: "/api/snapshots",
    reactQueryOptions: {
      onSuccess: (data) => {
        setIsLoading(false);
        setSnapshots(data.data);
      },
    },
  });

  return (
    <Page>
      <TitleBar title={"Snapshots"} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              Snapshots
            </Text>

            {isLoading ? (
              <SkeletonBodyText />
            ) : (
              <ResourceList
                resourceName={{ singular: "snapshot", plural: "snapshots" }}
                items={snapshots}
                renderItem={(snapshot) => {
                  return (
                    <ResourceItem
                      id={snapshot.id}
                      url={`/snapshots/${snapshot.id}`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {snapshot.name}
                      </Text>
                    </ResourceItem>
                  );
                }}
              />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
