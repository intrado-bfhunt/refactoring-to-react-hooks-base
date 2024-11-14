import React, { useState, useMemo, useEffect } from 'react';
import SelectList from './SelectList';
import DataFetcher from './DataFetcher';
import { makeServer } from '../../mocks';

const DataContainer = () => {
  const [selectedRoute, setSelectedRoute] = useState('');
  
  // Initialize mock server only once when component mounts
  useEffect(() => {
    const server = makeServer();
    return () => {
      // Cleanup server when component unmounts
      if (server?.shutdown) server.shutdown();
    };
  }, []); // Empty dependency array means it only runs once
  
  const routes = useMemo(() => [
    { value: 'sales', label: 'Sales' },
    { value: 'subscriptions', label: 'Subscriptions' }
  ], []);

  const renderData = (data) => {
    if (!data?.data) return null;
    
    return (
      <ul>
        {data.data.map((item, index) => (
          <li key={index}>
            {new Date(item.timestamp).toISOString()}: {item.amount}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>Please, select a chart</h1>
      <SelectList 
        items={routes}
        onChange={(e) => setSelectedRoute(e.target.value)}
      />
      
      {selectedRoute && (
        <DataFetcher
          url={`${process.env.REACT_APP_BASE_URL}/${selectedRoute}`}
          render={renderData}
        />
      )}
    </div>
  );
};

export default DataContainer;
