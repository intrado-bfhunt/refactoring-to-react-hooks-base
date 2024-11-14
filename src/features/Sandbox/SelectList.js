import React from 'react';
import PropTypes from 'prop-types';

const SelectList = ({ items = [], onChange }) => {
  return (
    <select onChange={onChange}>
      <option value="">--</option>
      {items.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

SelectList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func
};

export default SelectList;
