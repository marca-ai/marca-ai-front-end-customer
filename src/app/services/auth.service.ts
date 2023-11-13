import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from '../models/signup';
import { Login } from '../models/login';
import { Observable, delay, retry, timeout } from 'rxjs';
import { Token } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(login: Login): Observable<Token> {
    return this.http
      .post<Token>(environment.apiUrl + 'auth/customer/signin', login)
      .pipe(delay(100), retry(3), timeout(180000));
  }

  signup(user: Signup): Observable<Token> {
    return this.http
      .post<Token>(environment.apiUrl + 'auth/customer/signup', user)
      .pipe(delay(100), retry(3), timeout(180000));
  }

  recoveryUserByToken(): Observable<User> {
    return this.http
      .get<User>(environment.apiUrl + 'auth/customer/recovery-by-token')
      .pipe(delay(100), retry(3), timeout(180000));
  }
}
