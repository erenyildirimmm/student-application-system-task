import React from 'react'

const Button = ({children, className, ...props}) => {
  return (
    <button
      className={`hover:bg-orange-700 px-4 py-2 rounded-xl font-semibold uppercase text-sm items-center tracking-wide bg-orange-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button