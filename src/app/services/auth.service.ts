import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from '../models/signup';
import { Login } from '../models/login';
import { BehaviorSubject, Observable, delay, retry, timeout } from 'rxjs';
import { Token } from '../models/token';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserResponse } from '../models/userResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public loggedUser = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient,
              private router: Router) {}

  login(login: Login): Observable<Token> {
    const headers = new HttpHeaders().set('skipAuth', 'true');
    return this.http
      .post<Token>(environment.apiUrl + 'auth/customer/signin', login, { headers })
      .pipe(delay(100), retry(3), timeout(180000));
  }

  logout(){
    localStorage.removeItem('Authorization');
    this.router.navigate(['/login']);
  }

  signup(user: Signup): Observable<Token> {
    const headers = new HttpHeaders().set('skipAuth', 'true');
    return this.http
      .post<Token>(environment.apiUrl + 'auth/customer/signup', user, { headers })
      .pipe(delay(100), retry(3), timeout(180000));
  }

  recoveryUserByToken(): Observable<UserResponse> {
    return this.http
      .get<UserResponse>(environment.apiUrl + 'auth/customer/recovery-by-token')
      .pipe(delay(100), retry(3), timeout(180000));
  }
}
