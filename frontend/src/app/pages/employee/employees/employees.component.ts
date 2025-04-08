import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  
  employees: Employee[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  searchTerm: string = '';
  searchField: string = 'designation'; // Default search field

  constructor(
    private employeeService: EmployeeService, 
    private router: Router,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.fetchEmployees(); // Fetch all employees initially
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.isLoading = true;
      if (this.searchField === 'designation') {
        this.employeeService.searchEmployeeByField(this.searchTerm, null).subscribe({
          next: (res: any) => {
            this.employees = res.data.searchEmployeeByField.map((emp: Employee) => {
              emp.date_of_joining = this.convertDate(emp.date_of_joining);
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
      } else {
        this.employeeService.searchEmployeeByField(null, this.searchTerm).subscribe({
          next: (res: any) => {
            this.employees = res.data.searchEmployeeByField.map((emp: Employee) => {
              emp.date_of_joining = this.convertDate(emp.date_of_joining);

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
    } else {
      this.fetchEmployees(); 
    }
  }

  viewDetails(id: any): void {
    this.router.navigate(['/employee-details', id]); 
  }

  deleteEmployee(id: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            this.fetchEmployees(); // Refresh the employee list after deletion
          },
          error: (err) => {
            console.error('Error deleting employee:', err);
            this.errorMessage = 'Failed to delete employee.';
          }
        });
      }
    });
  }

  fetchEmployees(): void {
    this.employeeService.getAllEmployee().subscribe({
      next: (res: any) => {
        this.employees = res.data.getAllEmployees.map((emp: Employee) => {
          emp.date_of_joining = this.convertDate(emp.date_of_joining);
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

  private convertDate(date: any): Date {
    const dateStr = date.toString();
    const num = parseInt(dateStr);
    return !isNaN(num) ? new Date(num) : new Date();
  }
}
