import React, { createContext, useContext, useState } from "react";
import { Employee } from "../models/Employee";
import i18n from "../i18n";

type EmployeesContextType = {
  employees: Employee[] | null;
  setEmployees: (employees: Employee[] | null) => void;
  employee: Employee | null;
  setEmployee: (employee: Employee | null) => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: (status: boolean) => void;
  currentPage: number | undefined;
  setCurrentPage: (page: number) => void;
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
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [currentPage, setCurrentPage] = useState(1);

  const context = {
    employees,
    setEmployees,
    employee,
    setEmployee,
    selectedLanguage,
    setSelectedLanguage,
    isDialogEditOpen,
    setIsDialogEditOpen,
    currentPage,
    setCurrentPage,
  };

  return (
    <EmployeesContext.Provider value={context}>
      {children}
    </EmployeesContext.Provider>
  );
};
