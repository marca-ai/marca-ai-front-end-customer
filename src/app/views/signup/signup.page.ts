import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  pwdIcon1 = 'eye-outline';
  showPwd1 = false;
  pwdIcon2 = 'eye-outline';
  showPwd2 = false;
  signupForm!: FormGroup;
  loading: boolean = false;

  constructor(private router: Router,
              private toastService: ToastService,
              private authService: AuthService,
              public formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['',[Validators.required]],
      cep: ['',[Validators.required]],
      password: ['', [ Validators.required]],
      confirmPassword: ['', [ Validators.required]],
    });
  }

  signup(){
    this.loading = true;
    this.authService.signup(this.signupForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('Authorization', response.token);
        this.loading = false;
        this.toastService.success('Cadastro realizado com sucesso.', 5000, 'top');
        setTimeout(() => {
          this.router.navigate(['home']);
        },100);
      },
      error: (error) => {
        this.loading = false;
        if(error.status === 422){
          this.toastService.error(error.error.message, 5000, 'top');
        }else{
          this.toastService.error('Houve um erro ao realizar o cadastro.', 5000, 'top');
        }
      }
    });
  }

  get errorControl(){
    return this.signupForm.controls;
  }

  togglePwd1() {
    this.showPwd1 = !this.showPwd1;
    this.pwdIcon1 = this.showPwd1 ? 'eye-off-outline' : 'eye-outline';
  }

  togglePwd2() {
    this.showPwd2 = !this.showPwd2;
    this.pwdIcon2 = this.showPwd2 ? 'eye-off-outline' : 'eye-outline';
  }

  goBack(){
    this.router.navigate(['/login']);
  }

}
