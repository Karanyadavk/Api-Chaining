import React from 'react';

const APICard = ({ title, data }) => {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-white">
      <h2 className="font-bold text-lg">{title}</h2>
      <pre className="mt-2 text-sm bg-gray-100 p-2 rounded-md overflow-auto">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default APICard;
