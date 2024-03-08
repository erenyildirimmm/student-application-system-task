import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const Modal = ({ isActive, onClose, children, title }) => {
  return (
    <>
      {isActive && (
        <>
          <div
            onClick={onClose}
            className="h-screen w-full fixed z-10 bg-slate-950/30 left-0 top-0"
          ></div>
          <div className="fixed bg-slate-600 w-full md:max-h-full max-h-[450px] overflow-auto md:overflow-visible left-1/2 top-1/2 -translate-x-1/2 z-20 -translate-y-1/2  md:max-w-xl sm:max-w-sm max-w-xs rounded-xl p-4">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-2xl font-semibold text-orange-600">
                {title}
              </h4>
              <IoCloseSharp onClick={onClose} className="cursor-pointer" size={25} />
            </div>
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
