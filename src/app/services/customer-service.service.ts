import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, timeout } from 'rxjs';
import { MessageResponse } from '../models/messageResponse';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/userResponse';
import { UserUpdate } from '../models/userUpdate';
import { PhotoResponse } from '../models/photoResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http: HttpClient) { }

  updateProfileInformations(userUpdate: UserUpdate): Observable<UserResponse>{
    return this.http.patch<UserResponse>(environment.apiUrl + 'resource/customer/update', userUpdate)
      .pipe(delay(100), retry(3), timeout(180000));
  }

  setProfilePicture(file: File): Observable<PhotoResponse>{
    const formData: FormData = new FormData();
    formData.append('profile-picture', file, file.name);

    return this.http.patch<PhotoResponse>(environment.apiUrl + 'resource/customer/set-profile-picture', formData)
    .pipe(delay(100), retry(3), timeout(180000));
  }

  removeProfilePicture(): Observable<MessageResponse>{
    return this.http.delete<MessageResponse>(environment.apiUrl + 'resource/customer/remove-profile-picture')
      .pipe(delay(100), retry(3), timeout(180000));
  }

}
