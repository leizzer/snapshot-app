import { useState } from "react";
import {
  Card,
  Page,
  Layout,
  TextContainer,
  HorizontalGrid,
  Text,
  SkeletonBodyText,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useAppQuery } from "../hooks";
import { ProductsCard, SnapshotsList, ScheduleNew } from "../components";

export default function HomePage() {
  const [schedule, setSchedule] = useState({});

  const {
    isLoading
  } = useAppQuery({
    url: "/api/schedule",
    reactQueryOptions: {
      onSuccess: (data) => {
        setSchedule(data.data);
      },
    },
  });

  return (
    <Page>
      <TitleBar title={"Snapshots"} primaryAction={null} />
      <Layout>
        <Layout.Section>
          <HorizontalGrid columns={2} gap='5' >
            <Card sectioned>
              <TextContainer spacing="loose">
                {isLoading ? (
                  <SkeletonBodyText />
                ) : (
                  <>
                    <Text as="h2" variant="headingMd">
                      Schedule for Snapshots
                    </Text>
                    <ScheduleNew schedule={schedule} />
                  </>
                )}
              </TextContainer>
            </Card>
            <ProductsCard />
          </HorizontalGrid>
        </Layout.Section>

        <Layout.Section>
          <SnapshotsList />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
