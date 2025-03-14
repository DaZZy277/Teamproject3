import React from 'react';
import './TableAddButton.css';  // Make sure this file exists

const TableAddButton = ({children,onClick}) => {
  return (
    <button className="TA-button" onClick={onClick}>
        {children}
    </button>
);
};

export default TableAddButton;

