import React from 'react';

const PillButton = ({value}) => {
  return (
    <button
      className="bg-green-900 text-white px-4 py-2 rounded-full flex items-center group relative"
    >
      <span>{value}</span>
      <span
        className="delete-icon opacity-0 group-hover:opacity-100 transition-opacity absolute right-0 mr-2 cursor-pointer"
      >
        ✕
      </span>
    </button>
  );
};

export default PillButton;
