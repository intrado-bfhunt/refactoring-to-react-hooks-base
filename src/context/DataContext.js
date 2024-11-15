import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import useFetch from '@hooks/useFetch';

const initialState = {
  salesTotal: 0,
  subscriptionsTotal: 0,
  data: []
};

function dataReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_DATA':
      const responseData = action.payload.data || action.payload;
      return {
        ...state,
        data: Array.isArray(responseData) ? responseData : state.data,
        ...(responseData.salesTotal !== undefined ? {
          salesTotal: responseData.salesTotal,
          subscriptionsTotal: responseData.subscriptionsTotal
        } : {})
      };
    default:
      return state;
  }
}

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [currentUrl, setCurrentUrl] = useState("/api/totals");
  const { data, loading, error } = useFetch(currentUrl);

  useEffect(() => {
    if (data) {
      dispatch({ type: 'UPDATE_DATA', payload: data });
    }
  }, [data]);

  const fetchDataset = (endpoint) => {
    setCurrentUrl(endpoint);
  };

  const value = {
    ...state,
    loading,
    error,
    fetchDataset
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
