import React from "react";
import LineChart from "./LineChart";
import PropTypes from "prop-types";
import { useData } from "@context/DataContext";
import Loading from "@components/Loading";

const ChartContainer = ({ selectedLabel }) => {
  const { data: dataset, loading } = useData();

  if (loading) {
    return (
      <div className="chart-container">
        <Loading />
      </div>
    );
  }

  const chartLabels = dataset.map(dataPoint => dataPoint.timestamp);
  const chartValues = dataset.map(dataPoint => dataPoint.amount);

  return (
    <div className="chart-container">
      <LineChart
        chartLabels={chartLabels}
        chartValues={chartValues}
        label={selectedLabel}
      />
    </div>
  );
};

ChartContainer.propTypes = {
  selectedLabel: PropTypes.string.isRequired
};

export default ChartContainer;
