import { Employee } from "../models/Employee";
import { apiURL } from "./apiURL";


export const addEmployee = (newEmployee: Omit<Employee, "id">) => {
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

export const editDataEmployee = (employee: Employee) => {
  //const apiUrl = "http://localhost:3001/employees/" + employee.id;
  const apiUrl = apiURL + employee.id;

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

export const getDataEmployee = (id: string): Promise<Employee> => {
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

export const fetchDataEmployees = async (): Promise<Employee[]> => {
  const apiUrl = apiURL;
  const response = await fetch(apiUrl, { method: "GET" });
  if (response.ok) {
    const data = await response.json();
    const employees = data as Employee[];
    return employees.map((employee) => {
      employee.birthdate = employee.birthdate ? new Date(employee.birthdate) : null;
      return employee;
    });
  } else {
    throw new Error("Cannot fetch list of employees - fetchDataEmployees()");
  }
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
          employee.birthdate = employee.birthdate
            ? new Date(employee.birthdate)
            : null;
          return employee;
        });
      });
    } else {
      throw new Error("Cannot fetch list of employees!");
    }
  });
};
