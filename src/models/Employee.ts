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
  birthdate: Date | null;
}

export type EmployeeStatus = "UNKNOWN" | "HIRED" | "FIRED" | "ON_LEAVE";
