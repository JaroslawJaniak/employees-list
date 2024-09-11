import { Employee } from "../models/Employee";
import { config } from "./apiURL";

const employeeUrl = config.apirUrl + "employee/";
//apirUrl: "https://65b42955770d43aba47afb50.mockapi.io/",

export const addEmployee = async (newEmployee: Omit<Employee, "id">) => {
  const apiUrl = employeeUrl;

  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(newEmployee),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Cannot add new employee");
  }
};

export const editDataEmployee = async (employee: Employee) => {
  //const apiUrl = "http://localhost:3001/employees/" + employee.id;
  const apiUrl = employeeUrl + employee.id;

  const response = await fetch(apiUrl, {
    method: "PUT",
    body: JSON.stringify(employee),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Cannot edit employee");
  }
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
  const apiUrl = employeeUrl + id;

  const response = await fetch(apiUrl, { method: "DELETE" });
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

export const getDataEmployee = async (id: string): Promise<Employee> => {
  //const apiUrl = "http://localhost:3001/employees/" + id;
  const apiUrl = employeeUrl + id;

  const response = await fetch(apiUrl, { method: "GET" });
  if (response.ok) {
    return response.json().then((data) => {
      return { ...data, birthdate: new Date(data.birthdate) };
    });
  } else {
    throw new Error("Cannot find employee with id " + id);
  }
};

export const fetchDataEmployees = async (): Promise<Employee[]> => {
  const apiUrl = employeeUrl;
  const response = await fetch(apiUrl, { method: "GET" });
  if (response.ok) {
    const data = await response.json();
    const employees = data as Employee[];
    return employees.map((employee) => {
      employee.birthdate = employee.birthdate
        ? new Date(employee.birthdate)
        : null;
      return employee;
    });
  } else {
    throw new Error("Cannot fetch list of employees - fetchDataEmployees()");
  }
};

export const getAllEmployees = async (): Promise<Employee[]> => {
  //const apiUrl = "http://localhost:3001/employees";
  const apiUrl = employeeUrl;

  const response = await fetch(apiUrl, { method: "GET" });
  if (response.ok) {
    return response.json().then((data) => {
      const employees = data as Employee[];
      return employees.map((employee) => {
        employee.birthdate = employee.birthdate
          ? new Date(employee.birthdate)
          : null;
        return employee;
      });
    });
  } else {
    throw new Error("Cannot fetch list of employees!");
  }
};
