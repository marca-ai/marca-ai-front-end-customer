import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from '../models/signup';
import { Login } from '../models/login';
import { Observable, delay, retry, timeout } from 'rxjs';
import { Token } from '../models/token';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(login: Login): Observable<Token> {
    const headers = new HttpHeaders().set('skipAuth', 'true');
    return this.http
      .post<Token>(environment.apiUrl + 'auth/customer/signin', login, { headers })
      .pipe(delay(100), retry(3), timeout(180000));
  }

  signup(user: Signup): Observable<Token> {
    const headers = new HttpHeaders().set('skipAuth', 'true');
    return this.http
      .post<Token>(environment.apiUrl + 'auth/customer/signup', user, { headers })
      .pipe(delay(100), retry(3), timeout(180000));
  }

  recoveryUserByToken(): Observable<User> {
    return this.http
      .get<User>(environment.apiUrl + 'auth/customer/recovery-by-token')
      .pipe(delay(100), retry(3), timeout(180000));
  }
}
