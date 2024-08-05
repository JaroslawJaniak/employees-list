export interface Employee {
  id: string;
  firstname: string;
  lastname: string;
  salary: number;
  status: EmployeeStatus;
  phonenumber: number;
  address: string;
  city: string;
  zipcode: string;
  birthdate: Date;
}

export type EmployeeStatus = "HIRED" | "FIRED" | "ON_LEAVE";
