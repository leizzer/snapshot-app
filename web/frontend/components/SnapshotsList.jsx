import { useState } from "react";
import { Card, Text, ResourceList, ResourceItem, SkeletonBodyText } from "@shopify/polaris";
import { useAppQuery } from "../hooks";
import { useLinkClickHandler } from "react-router-dom";

export function SnapshotsList() {
  const [snapshots, setSnapshots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleNewSnapshotClick = useLinkClickHandler("/new_snapshot");


  useAppQuery({
    url: "/api/snapshots",
    reactQueryOptions: {
      onSuccess: (data) => {
        setIsLoading(false);
        setSnapshots(data.data);
      },
    },
  });

  return (
    <Card
      title="Snapshots"
      sectioned
      primaryFooterAction={{
        content: "New Snapshot",
        onAction: handleNewSnapshotClick,
      }}
    >
      <Card sectioned>
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
    </Card>
  );
}
