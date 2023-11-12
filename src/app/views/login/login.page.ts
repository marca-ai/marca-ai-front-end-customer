import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  pwdIcon = 'eye-outline';
  showPwd = false;
  /* loginResponse$: Observable<LoginResponse> = new Observable(); */
  email: string = '';
  password: string = '';
  minPasswordSize = 1;
  isDark = false;

  constructor() { }

  ngOnInit() {
  }

  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? 'eye-off-outline' : 'eye-outline';
  }

  login(){

  }

}
