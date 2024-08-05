import { Employee } from "../models/Employee";
import { apiURL } from "./apiURL";

export const createEmployee = (newEmployee: Omit<Employee, "id">) => {
  const apiUrl = "http://localhost:3001/employees";

  return fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(newEmployee),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Cannot add new employee");
    }
  });
};

export const editEmployee = (employee: Employee) => {
  const apiUrl = "http://localhost:3001/employees/" + employee.id;

  return fetch(apiUrl, {
    method: "PUT",
    body: JSON.stringify(employee),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Cannot edit employee");
    }
  });
};

export const deleteEmployee = (id: string): Promise<boolean> => {
  const apiUrl = "http://localhost:3001/employees/" + id;

  return fetch(apiUrl, { method: "DELETE" }).then((response) => {
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  });
};

export const getEmployee = (id: string): Promise<Employee> => {
  const apiUrl = "http://localhost:3001/employees/" + id;

  return fetch(apiUrl, { method: "GET" }).then((response) => {
    if (response.ok) {
      return response.json().then((data) => {
        return { ...data, birthdate: new Date(data.birthdate) };
      });
    } else {
      throw new Error("Cannot find employee with id " + id);
    }
  });
};

export const getAllEmployees = (): Promise<Employee[]> => {
  //const apiUrl = "http://localhost:3001/employees";
  const apiUrl = apiURL;
  console.log(apiURL);
  

  return fetch(apiUrl, { method: "GET" }).then((response) => {
    if (response.ok) {
      return response.json().then((data) => {
        const employees = data as Employee[];
        return employees.map((employee) => {
          employee.birthdate = new Date(employee.birthdate);
          return employee;
        });
      });
    } else {
      throw new Error("Cannot fetch list of employees!");
    }
  });
};
