import { useState, useCallback, useEffect } from "react";
import {
  Layout,
  Select
} from "@shopify/polaris";
import { useAuthenticatedFetch } from "../hooks";

export function ScheduleNew({ schedule }) {
  const [selected, setSelected] = useState(schedule?.recurring || "disabled");
  const [isLoading, setIsLoading] = useState(false);
  const fetch = useAuthenticatedFetch();

  const handleSelectChange = useCallback(
    (value) => {
      setSelected(value);
      sendSchedule(value);
    },
    []
  );

  const sendSchedule = async (value) => {
    setIsLoading(true);
    const response = await fetch("/api/schedule", {
      method: "POST",
      body: JSON.stringify({ data: { recurring: value } })
    });

    if (response.ok) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const options = [
    {label: "Disabled", value: "disabled"},
    {label: "Daily", value: "daily"},
    {label: "Weekly", value: "weekly"},
    {label: "Monthly", value: "monthly"}
  ];

  return (
    <Layout.Section>
      <Select
        label="Recurring"
        options={options}
        onChange={handleSelectChange}
        value={selected}
        disabled={isLoading}
      />
    </Layout.Section>
  );
}
