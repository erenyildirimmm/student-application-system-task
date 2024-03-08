import React from "react";
import CardBlock from "./CardBlock";

const ApplicationCard = ({ data }) => {
  return (
    <div className="w-full bg-slate-900 mb-5 p-5 rounded-xl">
        <div className="name text-center mb-6">
          <h4 className="text-xl font-semibold text-center text-white inline-flex">{data.name}</h4>
        </div>
        <div className="grid grid-cols-3">
          <CardBlock title="University" content={data.university} />
          <CardBlock title="Country" content={data.country} />
          <CardBlock title="Duration" content={data.duration} />
          <CardBlock title="Cost" content={data.cost} />
          <CardBlock title="Deadline Date" content={data.deadline} />
          <CardBlock title="Language" content={data.language} />
        </div>
    </div>
  );
};

export default ApplicationCard;
