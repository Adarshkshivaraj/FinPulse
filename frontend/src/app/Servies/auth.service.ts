import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        if (this.isBrowser) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  register(LoginName: string, email: string, password: string, mobileNumber: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, {
      LoginName,
      email,
      password,
      mobileNumber
    });
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('authToken');
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
