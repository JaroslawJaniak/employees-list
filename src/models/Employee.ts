export interface Employee {
  id: string;
  firstname: string;
  lastname: string;
  salary: number;
  status: EmployeeStatus;
  phonenumber: number;
  address: string;
  city: string;
  postalcode: string;
  birthdate: Date;
}

export type EmployeeStatus = 'HIRED' | 'FIRED' | 'ON_LEAVE';