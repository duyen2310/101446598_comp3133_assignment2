import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee?: Employee;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.searchEmployeeByEid(id).subscribe({
        next: (res) => {
          this.employee = res.data.searchEmployeeByEid;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load employee details.';
          this.isLoading = false;
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Invalid employee ID.';
      this.isLoading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
