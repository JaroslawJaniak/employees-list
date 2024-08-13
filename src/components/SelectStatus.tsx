import { useState } from "react";
import { STATUS_OPTIONS } from "../models/StatusOption";
import { useTranslation } from "react-i18next";
import { EmployeeStatus } from "../models/Employee";

export interface SelectStatusProps {
  name: string;
  defaultValue?: string;
  onChange?: (status: EmployeeStatus) => void;
}

export function SelectStatus({
  name,
  defaultValue,
  onChange,
}: SelectStatusProps) {
  const { t } = useTranslation();
  const [statusOptions] = useState(STATUS_OPTIONS);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    event.preventDefault();
    const status = event.target.value as EmployeeStatus;

    if (onChange) {
      onChange(status);
    }
  };

  return (
    <select
      onChange={handleChange}
      defaultValue={defaultValue}
      className="block pt-1 pb-1 ps-10 mb-3 text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
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
