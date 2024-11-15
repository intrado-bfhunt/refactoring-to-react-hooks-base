import React, { useState, useEffect } from "react";
import Aside from "@components/Aside";
import ChartContainer from "./ChartContainer";
import Layout from "@components/Layout";
import Main from "@components/Main";
import SelectList from "@components/SelectList";
import SummaryContainer from "./SummaryContainer";
import { useData } from "@context/DataContext";

const DashboardShell = () => {
  const [selectedLabel, setSelectedLabel] = useState("");
  const { fetchDataset } = useData();

  useEffect(() => {
    // Initially load totals
    fetchDataset("/api/totals");
  }, [fetchDataset]);

  const handleSelectChange = (event) => {
    const selectedLabel = event.target.selectedOptions[0].label;
    fetchDataset(event.target.value);
    setSelectedLabel(selectedLabel);
  };

  const optionsForSelect = [
    { label: "Sales", value: "/api/sales" },
    {
      label: "Subscriptions",
      value: "/api/subscriptions"
    }
  ];

  return (
    <Layout>
      <Aside>
        <h2># Polly dashboard</h2>
        <label htmlFor="select-product">Please select a chart:</label>
        <div className="field">
          <SelectList 
            items={optionsForSelect}
            onChange={handleSelectChange}
          />
          <div className="chevron-wrapper flex">
            <svg
              className="chevron"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </Aside>
      <Main>
        <h1>
          Welcome, <span className="bold">learner!</span>
        </h1>
        <SummaryContainer />
        {selectedLabel && <ChartContainer selectedLabel={selectedLabel} />}
      </Main>
    </Layout>
  );
};

export default DashboardShell;
