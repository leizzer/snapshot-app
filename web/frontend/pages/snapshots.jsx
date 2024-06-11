import {Page, Layout} from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { SnapshotsList } from "../components";

export default function SnapshotsPage() {
  return (
    <Page>
      <TitleBar title={"Snapshots"} />
      <Layout.Section>
        <SnapshotsList />
      </Layout.Section>
    </Page>
  );
}
