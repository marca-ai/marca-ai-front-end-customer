import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  pwdIcon = 'eye-outline';
  showPwd = false;
  /* loginResponse$: Observable<LoginResponse> = new Observable(); */
  email: string = '';
  password: string = '';
  minPasswordSize = 1;
  isDark = false;

  constructor(public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email]],
      password: ['', [ Validators.required]]
    });
  }

  get errorControl(){
    return this.loginForm.controls;
  }

  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? 'eye-off-outline' : 'eye-outline';
  }

  login(){
    if(this.loginForm.valid){

    }else{
      return console.log("Formulário de login inválido.")
    }
  }

}
