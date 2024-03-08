import React from "react";

const Form = ({ onSubmit, title, className, children }) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-full p-6 bg-slate-900 flex flex-col items-center rounded-xl">
      <h1 className="text-4xl mb-8 text-slate-100">
        {title.split(" ")[0]}{" "}
        <span className="text-orange-600">{title.split(" ")[1]}</span>
      </h1>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </div>
  );
};

export default Form;
