import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isToastOpen = false;
  loginForm!: FormGroup;
  pwdIcon = 'eye-outline';
  showPwd = false;
  email: string = '';
  password: string = '';
  minPasswordSize = 1;
  isDark = false;

  constructor(public formBuilder: FormBuilder,
              private toastService: ToastService,
              private authService: AuthService) {
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

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? 'eye-off-outline' : 'eye-outline';
  }

  login(){
    if(this.loginForm.valid){
      this.isToastOpen = true;

    }else{
      return console.log("Formulário de login inválido.")
    }
  }

}
