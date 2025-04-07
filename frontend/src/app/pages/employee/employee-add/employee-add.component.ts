import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee/employee.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-add',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent {
  employeeForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService, 
  ) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: [0, Validators.required],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) this.selectedFile = file;
  }

  onSubmit() {
    if (this.employeeForm.invalid) return;

    const formValues = this.employeeForm.value;
    const dateUnix = new Date(formValues.date_of_joining).getTime().toString();

    const input = {
      ...formValues,
      date_of_joining: dateUnix,
      employee_photo: this.selectedFile ? this.selectedFile.name : ''
    };

    this.employeeService.addEmployee(input).subscribe({
      next: (res) => {
        console.log('Employee added successfully:', res);
        this.employeeForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Failed to add employee:', err);
      }
    });
  }
}
