import { useState } from "react";
import { STATUS_OPTIONS } from "../models/StatusOption";
import { useTranslation } from "react-i18next";

export interface SelectStatusProps {
  name: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectStatus({
  name,
  defaultValue,
  onChange,
}: SelectStatusProps) {
  const { t } = useTranslation();
  const [statusOptions] = useState(STATUS_OPTIONS);

  return (
    <select
      onChange={onChange}
      defaultValue={defaultValue}
      className="block pt-1 pb-1 ps-10 mb-3 text-gray-900 border border-gray-300 rounded w-80 sm:w-48 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
      name={name}
    >
      {statusOptions.map((statusCode) => (
        <option key={statusCode} value={statusCode}>
          {t("status_" + statusCode)}
        </option>
      ))}
    </select>
  );
}
