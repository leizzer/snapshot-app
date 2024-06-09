import { useState } from "react";
import { ProductsList } from "../components";
import { Card, Page, Layout, SkeletonBodyText, Text, Button } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { Form, FormLayout, Checkbox, TextField } from '@shopify/polaris';

export default function NewSnapshotPage() {
  const [snapshot, setSnapshot] = useState({ name: "", products: [] });
  const [isLoading, setIsLoading] = useState(true);
  const fetch = useAuthenticatedFetch();

  const {
    refetch: refetchSnapshot,
  } = useAppQuery({
    url: "/api/snapshots/new",
    reactQueryOptions: {
      onSuccess: (data) => {
        setIsLoading(false);
        setSnapshot(data.data);
      },
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    const response = await fetch("/api/snapshots", {
      method: "POST",
      body: JSON.stringify({data: {name: snapshot.name}})
    });

    if (response.ok) {
      await refetchSnapshot();
    } else {
      setIsLoading(false);
    }
  };

  const handleFormChange = (value, key) => {
    setSnapshot({ ...snapshot, [key]: value });
  };


  return (
    <Page>
      <TitleBar
        title={"New Snapshot"}
        primaryAction={{
          content: "Cancel",
          onAction: () => console.log("Primary action"),
          destructive: true
        }}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              Snapshot
            </Text>

            {isLoading ? (
              <SkeletonBodyText />
            ) : (
              <Form onSubmit={handleSubmit}>
                <FormLayout>
                  <TextField
                    id="name"
                    value={snapshot.name}
                    onChange={handleFormChange}
                    label="Name"
                    type="text"
                    autoComplete="false"
                  />

                  <Button submit>Create</Button>
                </FormLayout>
              </Form>
            )}
          </Card>

          <ProductsList products={snapshot.products} isLoading={isLoading} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
