import { useState, useCallback } from "react";
import { ProductsList } from "../components";
import { Card, Page, Layout, SkeletonBodyText, Text, Button } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { Form, FormLayout, TextField } from '@shopify/polaris';
import { useNavigate } from "react-router-dom";

export default function NewSnapshotPage() {
  const [snapshot, setSnapshot] = useState({ name: "", products: [] });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();

  useAppQuery({
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
      body: JSON.stringify(
        {
          data: {
            name: snapshot.name,
            product_ids: selectedProducts
          }
        }
      )
    })

    if (response.ok) {
      const { data } = await response.json()
      navigate(`/snapshots/${data.id}`)
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const handleFormChange = (value, key) => {
    setSnapshot({ ...snapshot, [key]: value });
  };

  const handleSelection = useCallback(
    setSelectedProducts,
    []
  );

  return (
    <Page>
      <TitleBar title={"New Snapshot"} />
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

          <ProductsList
            products={snapshot.products}
            isLoading={isLoading}
            selectedProducts={selectedProducts}
            setSelectedProducts={handleSelection}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
