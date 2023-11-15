import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageResponse } from '../models/messageResponse';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {

  constructor(private http: HttpClient,) { }

  sendCode(email: string): Observable<MessageResponse>{
    const headers = new HttpHeaders().set('skipAuth', 'true');

    return this.http.post<MessageResponse>(environment.apiUrl + 'password-recovery/send-code',
    {'userEmail': email}, { headers })
    .pipe(delay(100), retry(3), timeout(180000));
  }

  validCode(email: string, code: string): Observable<MessageResponse>{
    const headers = new HttpHeaders().set('skipAuth', 'true');

    return this.http.post<MessageResponse>(environment.apiUrl + 'password-recovery/verify-code',
    {'userEmail': email, 'code': code}, { headers })
    .pipe(delay(100), retry(3), timeout(180000));
  }

  recoveryPassword(email: string, password: string): Observable<MessageResponse>{
    const headers = new HttpHeaders().set('skipAuth', 'true');

    return this.http.post<MessageResponse>(environment.apiUrl + 'password-recovery/recovery-password',
    {'userEmail': email, 'newPassword': password}, { headers })
    .pipe(delay(100), retry(3), timeout(180000));
  }




}
