import React from 'react';

const BlueButton = ({ value  }) => {
  return (
    <button
      className="bg-blue-500 text-white py-1 px-3 rounded-full"
      
    >
      {value}
    </button>
  );
};

export default BlueButton;
