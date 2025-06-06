import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface SignupResponse {
  data: {
    signup: string; 
  };
}

interface LoginResponse {
  data: {
    login: string; 
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private graphqlUrl = 'http://localhost:3000/graphql';

  constructor(private http: HttpClient) {}

  storeToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  clearToken(): void {
    localStorage.removeItem('accessToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  signup(username: string, email: string, password: string): Observable<any> {
    const graphqlQuery = {
      query: `
        mutation Signup($username: String!, $email: String!, $password: String!) {
          signup(username: $username, email: $email, password: $password)
        }
      `,
      variables: {
        username: username,
        email: email,
        password: password,
      },
    };

    return this.http.post<SignupResponse>(this.graphqlUrl, graphqlQuery).pipe(
      tap((res) => {
        if (res.data.signup) {
          this.storeToken(res.data.signup);
        }
      })
    );
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const graphqlQuery = {
      query: `
        query Login($username: String!, $password: String!) {
          login(username: $username, password: $password)
        }
      `,
      variables: {
        username: username,
        password: password,
      },
    };

    return this.http.post<LoginResponse>(this.graphqlUrl, graphqlQuery).pipe(
      tap((res) => {
        if (res.data.login) {
          this.storeToken(res.data.login);
        }
      })
    );
  }
}
