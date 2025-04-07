export interface Employee {
    _id?: string; // optional if you're adding a new employee
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    designation: string;
    salary: number;
    date_of_joining: Date;
    department: string;
    employee_photo?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  