import React from "react";

interface DialogEditProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const DialogEdit: React.FC<DialogEditProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-25 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg   mt-12 mx-2 w-1/3">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Panel edycji pracownika</h2>
          <button
            className="text-2xl leading-none hover:text-red-500"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default DialogEdit;
