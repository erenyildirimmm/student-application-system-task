import React from "react";

const CardBlock = ({ title, content }) => {
  return (
    <div className="mb-3 text-center">
      <h5 className="text-xs font-semibold text-orange-100 mb-2 inline-block border-b border-orange-500 pb-1">{title}</h5>
      <p className="text-sm font-semibold">{content}</p>
    </div>
  );
};

export default CardBlock;
