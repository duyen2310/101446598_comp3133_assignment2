import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model'; // adjust path if needed
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule, MatButtonModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService, 
    private router: Router,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  viewDetails(id: any) {
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
            this.fetchEmployees();
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
