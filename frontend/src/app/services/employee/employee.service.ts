import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { AuthService } from '../auth/auth.service';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private graphUrl = 'https://101446598-comp-3133-101446598-assignment1.vercel.app';

  constructor(private http: HttpClient, private authService: AuthService) { }


  getAllEmployee(): Observable<{ data: { getAllEmployee: Employee[] } }> {
    const query = {
      query: `
        query {
          getAllEmployees {
            _id
            first_name
            last_name
            designation
            date_of_joining
            department
            employee_photo
          }
        }
      `
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });


    return this.http.post<{ data: { getAllEmployee: Employee[] } }>(
      this.graphUrl,
      query,
      { headers }
    );
  }
  

  addEmployee(employee: Employee): Observable<{ data: { addEmployee: Employee } }> {
    const query = {
      query: `
        mutation($employeeInput: EmployeeInput!) {
          addEmployee(input: $employeeInput) {
            _id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
          }
        }
      `,
      variables: {
        employeeInput: {
          ...employee, 
          employee_photo: employee.employee_photo || null, 
        }
      },
    };
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  
    return this.http.post<{ data: { addEmployee: Employee } }>(
      this.graphUrl,
      query,
      { headers }
    );
  }
  updateEmployee(id: string, employee: Employee): Observable<{ data: { updateEmployee: Employee } }> {
    const query = {
      query: `
        mutation updateEmployee($eid: ID!, $input: EmployeeInput!) {
          updateEmployee(eid: $eid, input: $input) {
            _id
            first_name
            last_name
            email
            designation
            salary
            date_of_joining
            department
            employee_photo
          }
        }
      `,
      variables: {
        eid: id,
        input: employee
      }
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  
  
    return this.http.post<{ data: { updateEmployee: Employee } }>(this.graphUrl, query,{headers});
  }
  updateEmployeewithPhoto(id: string, employee: Employee, selectedFile: File | null): Observable<{ data: { updateEmployee: Employee } }> {
    const query = {
      query: `
        mutation updateEmployee($eid: ID!, $input: EmployeeInput!) {
          updateEmployee(eid: $eid, input: $input) {
            _id
            first_name
            last_name
            email
            designation
            salary
            date_of_joining
            department
            employee_photo
          }
        }
      `,
      variables: {
        eid: id,
        input: { 
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          designation: employee.designation,
          department: employee.department,
          salary: employee.salary,
          date_of_joining: employee.date_of_joining,
        }
      }
    };
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  
    if (selectedFile) {
      const formData = new FormData();
      formData.append('employee_photo', selectedFile, selectedFile.name);  
      formData.append('employee_data', JSON.stringify(query.variables));  
  
      return this.http.post<any>(`${this.graphUrl}`, formData, { headers });
    } else {
      return this.http.post<{ data: { updateEmployee: Employee } }>(this.graphUrl, query, { headers });
    }
  }
  

  searchEmployeeByEid(id: string): Observable<{ data: { searchEmployeeByEid: Employee } }> {
    const query = {
      query: `
        query searchEmployeeByEid($eid: ID!) {
          searchEmployeeByEid(eid: $eid) {
            _id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
          }
        }
      `,
      variables: {
        eid: id 
      }
    };
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  
    return this.http.post<{ data: { searchEmployeeByEid: Employee } }>(
      this.graphUrl,
      query,
      { headers }
    );
  }
  
  deleteEmployee(id: string): Observable<{ data: { deleteEmployee: String } }> {
    const query = {
      query: `
        mutation deleteEmployee($eid: ID!) {
          deleteEmployee(eid: $eid)
        }
      `,
      variables: {
        eid: id 
      }
    };
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  
    return this.http.post<{ data: { deleteEmployee: String } }>(
      this.graphUrl,
      query,
      { headers }
    );
  }  


  searchEmployeeByField(designation: string | null, department: string | null): Observable<{ data: { searchEmployeeByField: Employee[] } }> {
    const query = {
      query: `
        query searchEmployeeByField($designation: String, $department: String) {
    searchEmployeeByField(designation: $designation, department: $department) {
        _id
        first_name
        last_name
        email
        gender
        designation
        salary
        date_of_joining
        department
        employee_photo
    }
}
      `,
      variables: {
        designation: designation || null, 
        department: department || null     
      }
    };
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  
    return this.http.post<{ data: { searchEmployeeByField: Employee[] } }>(
      this.graphUrl,
      query,
      { headers }
    );
  }
  
}
