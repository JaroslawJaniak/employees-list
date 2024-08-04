import { Employee } from "../models/Employee";

export const createEmployee = (newEmployee: Omit<Employee, "id">) => {
  const apiUrl = "http://localhost:3002/employees";

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
  const apiUrl = "http://localhost:3002/employees/" + employee.id;

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

export const getEmployee = (id: string): Promise<Employee> => {
  const apiUrl = "http://localhost:3002/employees/" + id;

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
  const apiUrl = "http://localhost:3002/employees";

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
