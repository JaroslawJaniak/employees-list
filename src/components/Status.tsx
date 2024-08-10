import { EmployeeStatus } from "../models/Employee";
import { STATUS_OPTIONS, useTranslateStatus } from "../models/StatusOption";

export interface StatusPros {
  data: string;
}

export function Status({ data }: StatusPros) {
  const { translateStatus } = useTranslateStatus();

  const getClassName = (status: string): string => {
    const classes = new Map([
      ["FIRED", "text-bg-danger"],
      ["ON_LEAVE", "text-bg-warning"],
      ["HIRED", "text-bg-success"],
      ["UNKNOWN", "text-bg-secondary"],
    ]);

    return classes.get(status) as string;
  };

  const status = STATUS_OPTIONS.includes(data as EmployeeStatus)
    ? data
    : "UNKNOWN";
  return (
    <span data-testid="status" className={"badge " + getClassName(status)}>
      {translateStatus(status as EmployeeStatus)}
    </span>
  );
}
