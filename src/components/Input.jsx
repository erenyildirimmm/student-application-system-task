const Input = ({
  label,
  className,
  Tag = "input",
  ...props
}) => {

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
      ></Tag>
    </div>
  );
};

export default Input;
