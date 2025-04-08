import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId!: string;
  selectedFile: File | null = null; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.employeeId = this.route.snapshot.paramMap.get('id') || '';

    if (this.employeeId) {
      this.employeeService.searchEmployeeByEid(this.employeeId).subscribe({
        next: (res) => {
          const emp = res.data.searchEmployeeByEid;
          console.log('Employee Data:', emp); 

          if (this.employeeForm) {
            this.employeeForm.patchValue({
              first_name: emp.first_name,
              last_name: emp.last_name,
              email: emp.email,
              gender: emp.gender,
              designation: emp.designation,
              department: emp.department,
              salary: emp.salary,
              date_of_joining: new Date(emp.date_of_joining).toISOString().substring(0, 10), 
              employee_photo: emp.employee_photo  
            });
          }
        },
        error: (err) => {
          console.error('Error fetching employee:', err);
        }
      });
    }
  }

  // Initialize the form
  initForm(): void {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      salary: [0, Validators.required],
      date_of_joining: ['', Validators.required],
      employee_photo: [''] 
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee: Employee = {
        ...this.employeeForm.value,
        date_of_joining: new Date(this.employeeForm.value.date_of_joining).getTime(),
        _id: this.employeeId,
      };
  
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('employee_photo', this.selectedFile, this.selectedFile.name);
        
        this.employeeService.updateEmployeewithPhoto(this.employeeId, updatedEmployee, this.selectedFile).subscribe({
          next: () => {
            alert('Employee updated successfully!');
            this.router.navigate(['/employee-view']);
          },
          error: (err: any) => {
            console.error('Update failed:', err);
          }
        });
      } else {
        this.employeeService.updateEmployee(this.employeeId, updatedEmployee).subscribe({
          next: () => {
            alert('Employee updated successfully!');
            this.router.navigate(['/employee-view']);
          },
          error: (err) => {
            console.error('Update failed:', err);
          }
        });
      }
    }
  }
  
  
}
