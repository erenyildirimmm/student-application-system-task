import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = ({ data, onSelect, placeholder, name, label, className, ...props }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [options, setOptions] = useState([])

  const handleSelect = (option, name) => {
    setSelectedOption((opt) => option);
    setDropdown((list) => !list);
    onSelect(option, name);
  };

  const handleDropdown = () => {
    setDropdown((list) => !list);
  };

  useEffect(() => {
    const opt = [];
    data.forEach((item) => {
      const option = item[name];
      if(!opt.includes(option)) {
        opt.push(option);
      }
    })
    setOptions((option) => opt);
  }, [data])

  return (
    <div className={`relative w-full ${className}`} {...props}>
      {label && (
        <label htmlFor={name} className={`text-md mr-4`}>
          {label}
        </label>
      )}
      <div
        tabIndex={0}
        className={`mt-3 bg-transparent border-2 w-full border-gray-500 focus:border-orange-700 py-2 text-sm px-3 outline-none rounded-xl flex justify-between items-center`}
        onClick={handleDropdown}
      >
        {selectedOption ? (
          selectedOption
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <IoIosArrowDown
          className={
            dropdown
              ? "rotate-180 duration-75 ease-in-out"
              : "duration-100 ease-in-out"
          }
        />
      </div>
      {dropdown && (
        <ul className="absolute bg-slate-900 text-white border rounded-md mt-2 w-full overflow-y-auto md:max-h-60 max-h-40 shadow z-30">
          {options.length > 0 &&
            options.map((option, index) => (
              <li
                key={index}
                className="sm:p-3 px-3 py-2 hover:bg-orange-600 hover:text-white cursor-pointer"
                onClick={() => handleSelect(option, name)}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
