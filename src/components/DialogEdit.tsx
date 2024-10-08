import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-25 backdrop-blur-sm z-50 p-1">
      <div className="bg-white rounded-lg shadow-lg mt-2 sm:mt-1 lg:mt-12 mx-2  w-full md:w-3/4 lg:w-4/5 xl:w-1/2">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="mx-12 text-xl font-fantasy">
            {t("edit_panel_title")}
          </h2>
          <button
            className="text-3xl leading-none hover:text-red-500"
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
