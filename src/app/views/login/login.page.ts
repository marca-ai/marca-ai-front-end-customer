import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: boolean = false;
  loginForm!: FormGroup;
  pwdIcon = 'eye-outline';
  showPwd = false;
  email: string = '';
  password: string = '';
  minPasswordSize = 1;
  isDark = false;

  constructor(public formBuilder: FormBuilder,
              private router: Router,
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

  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? 'eye-off-outline' : 'eye-outline';
  }

  login(){
    if(this.loginForm.valid){
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('Authorization', response.token);
          this.router.navigate(['home']);
        },
        error: (error) => {
          this.loading = false;
          if(error.status === 401){
            this.toastService.error('Email ou senha inválidos', 5000, 'top');
          }else{
            this.toastService.error('Não foi possível fazer login, tente novamente mais tarde.', 5000, 'top');
          }
          
        },
        complete: () => {
          this.loading = false;
          this.toastService.success('Login realizado com sucesso.', 5000, 'top');
        }
      });
    }else{
      this.toastService.warn('Informações de login inválidas.', 5000, 'top');
    }
  }

}
