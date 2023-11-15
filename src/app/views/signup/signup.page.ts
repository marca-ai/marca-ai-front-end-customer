import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { Signup } from 'src/app/models/signup';
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

  readonly phoneMask: MaskitoOptions = {
    mask: [
      '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/
    ],
  };
  readonly cepMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  };

  readonly birthDateMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  constructor(private router: Router,
              private toastService: ToastService,
              private authService: AuthService,
              public formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      birthDate: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['',[Validators.required, Validators.minLength(15)]],
      cep: ['',[Validators.required, Validators.minLength(9)]],
      password: ['', [ Validators.required]],
      confirmPassword: ['', [ Validators.required]],
    },{
      validator: this.passwordIsEquals('password', 'confirmPassword')
    });
  }

  passwordIsEquals(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
  
      if (password.value !== confirmPassword.value) {
        return {
          passwordIsNotEquals: true
        };
      }
  
      return {};
    };
  }

  signup(){
    if(this.signupForm.valid){
      this.loading = true;
      var signup: Signup = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        birthday: new Date(this.signupForm.value.birthDate),
        phoneNumber: this.signupForm.value.phoneNumber.replace('(', '')
                                                      .replace(')','')
                                                      .replace('-','')
                                                      .replace(' ',''),
        cep: this.signupForm.value.cep.replace('-',''),
        password: this.signupForm.value.password
      }

      this.authService.signup(signup).subscribe({
        next: (response) => {
          this.loading = false;
          localStorage.setItem('Authorization', response.token);
          this.toastService.success('Cadastro realizado com sucesso.', 5000, 'top');
          setTimeout(() => {
            this.router.navigate(['']);
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
