import React from "react";

interface DialogEditProps {
  isOpen: boolean | undefined;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const DialogEdit: React.FC<DialogEditProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-25 backdrop-blur-sm z-50 p-1">
      <div className="bg-white rounded-lg shadow-lg mt-12 sm:mt-4 lg:mt-12 mx-2  w-full lg:w-1/2 ">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Panel edycji pracownika</h2>
          <button
            className="text-2xl leading-none hover:text-red-500"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-3 text-xs lg:text-sm">{children}</div>
      </div>
    </div>
  );
};

export default DialogEdit;
