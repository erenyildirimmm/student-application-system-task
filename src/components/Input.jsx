import React, { useEffect, useState } from "react";

const Input = ({
  label,
  className,
  Tag = "input",
  ...props
}) => {
  const [selectedInput, setSelectedInput] = useState("");


  return (
    <div className={className}>
      {label && (
        <label
          className={`text-md`}
        >
          {label}
        </label>
      )}
      <Tag
        {...props}
        className="mt-3  bg-transparent border-2 w-full border-gray-500 appearance-none focus:border-orange-700 py-2 text-sm px-3 outline-none rounded-xl"
        // className={`bg-transparent border w-full border-gray-500 focus:border-yellow-500 py-2 px-3 rounded-md outline-none ${
        //   selectedInput === props.name ? "text-amber-700 border-amber-700" : ""
        // }`}
      ></Tag>
    </div>
  );
};

export default Input;
