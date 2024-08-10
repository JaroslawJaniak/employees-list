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
      className="form-control"
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
