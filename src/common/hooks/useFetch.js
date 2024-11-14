import { useReducer, useEffect, useRef } from 'react';

const initialState = {
  data: null,
  loading: false,
  error: null
};

const actionTypes = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR'
};

function fetchReducer(state, action) {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.FETCH_SUCCESS:
      return {
        data: action.payload,
        loading: false,
        error: null
      };
    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

/**
 * Custom hook for handling data fetching with loading, error, and success states
 * @param {string} url - The URL to fetch data from
 * @param {Object} options - Optional fetch options (e.g., method, headers)
 * @returns {Object} Object containing { data, loading, error }
 */
const useFetch = (url, options = {}) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const optionsRef = useRef(options);

  useEffect(() => {
    // Don't fetch if no URL is provided
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: actionTypes.FETCH_START });
      
      try {
        const response = await fetch(url, optionsRef.current);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        dispatch({ 
          type: actionTypes.FETCH_SUCCESS, 
          payload: result 
        });
      } catch (err) {
        dispatch({ 
          type: actionTypes.FETCH_ERROR, 
          payload: err.message 
        });
      }
    };

    fetchData();
  }, [url]); // Only re-fetch if URL changes

  // Update options ref if options change
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return state;
};

export default useFetch;
