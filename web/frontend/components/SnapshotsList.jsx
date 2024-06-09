import { useState } from "react";
import { Card, TextContainer, Text } from "@shopify/polaris";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useLinkClickHandler } from "react-router-dom";

export function SnapshotsList() {
  const [isLoading, setIsLoading] = useState(true);
  const fetch = useAuthenticatedFetch();
  const handleNewSnapshotClick = useLinkClickHandler("/new_snapshot");

  const {
    data,
    refetch: refetchList,
    isLoading: isLoadingList,
    isRefetching: isRefetchingList,
  } = useAppQuery({
    url: "/api/snapshots",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const handleNewSnapshot = async () => {
    setIsLoading(true);
    const response = await fetch("/api/snapshots/new", {method: "GET"});

    if (response.ok) {
      await refetchProductCount();
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Card
      title="Snapshots"
      sectioned
      primaryFooterAction={{
        content: "New Snapshot",
        onAction: handleNewSnapshotClick,
      }}
    >
      <TextContainer>
        <Text>
          {isLoading
            ? "Loading..."
            : data?.length
            ? `You have ${data.length} snapshots.`
            : "You have no snapshots."}
        </Text>
      </TextContainer>
    </Card>
  );
}
