import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model'; // adjust path if needed
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getAllEmployee().subscribe({
      next: (res: any) => {
        this.employees = res.data.getAllEmployees.map((emp: Employee) => {
          const dateOfJoiningStr: string = emp.date_of_joining.toString();  
          const num = parseInt(dateOfJoiningStr);
  
          if (!isNaN(num)) {
            emp.date_of_joining = new Date(num);
          } else {
            emp.date_of_joining = new Date(); 
          }
  
          console.log(emp.date_of_joining); 
          return emp;
        });
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load employees.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
  
  
  
  
  
}
