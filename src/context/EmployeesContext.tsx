import React, { createContext, useContext, useState } from "react";
import { Employee } from "../models/Employee";

type EmployeesContextType = {
  employees: Employee[] | null;
  setEmployees: (employees: Employee[] | null) => void;
  employee: Employee | null;
  setEmployee: (employee: Employee | null) => void;

  isDialogEditOpen: boolean;
  setIsDialogEditOpen: (status: boolean) => void;
};

export const EmployeesContext = createContext<EmployeesContextType | undefined>(
  undefined
);

export const useEmployeeContext = () => {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within a EmployeeProvider"
    );
  }
  return context;
};

export const EmployeesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);

  const context = {
    employees,
    setEmployees,
    employee,
    setEmployee,
    isDialogEditOpen,
    setIsDialogEditOpen,
  };

  return (
    <EmployeesContext.Provider value={context}>
      {children}
    </EmployeesContext.Provider>
  );
};
