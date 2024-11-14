import React from 'react';
import PropTypes from 'prop-types';
import { useFetch } from '../../common/hooks';
import Loading from '../../common/components/Loading';

const DataFetcher = ({ url, render }) => {
  const { data, loading, error } = useFetch(url);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return render(data);
};

DataFetcher.propTypes = {
  url: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};

export default DataFetcher;
