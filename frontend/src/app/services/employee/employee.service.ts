import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { AuthService } from '../auth/auth.service';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private graphUrl = 'http://localhost:3000/graphql';

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
  

  // updateEmployee(id: string, employee: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}`, employee);
  // }

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
        eid: id  // Passing the id as 'eid' as per the mutation argument
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
}
