import { Page, Layout } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { SnapshotsList } from "../components";
import { useNavigate } from "react-router-dom";

export default function SnapshotsPage() {
  const navigate = useNavigate();

  return (
    <Page>
      <TitleBar
        title={"Snapshots"}
        primaryAction={{
          content: "New Snapshot",
          onAction: () => navigate("/new_snapshot"),
        }}
      />
      <Layout.Section>
        <SnapshotsList />
      </Layout.Section>
    </Page>
  );
}
