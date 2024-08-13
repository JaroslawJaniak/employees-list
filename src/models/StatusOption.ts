import { useTranslation } from "react-i18next";
import { EmployeeStatus } from "./Employee";

export interface StatusOption {
  label: string;
  value: EmployeeStatus;
}

export const STATUS_OPTIONS: EmployeeStatus[] = [
  "UNKNOWN",
  "FIRED",
  "HIRED",
  "ON_LEAVE",
];

export const useTranslateStatus = (): {
  translateStatus: (s: EmployeeStatus) => string;
} => {
  const { t } = useTranslation();

  const translateStatus = (s: EmployeeStatus) => t("status_" + s);

  return { translateStatus };
};
