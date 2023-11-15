import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.page.html',
  styleUrls: ['./recovery-password.page.scss'],
})
export class RecoveryPasswordPage implements OnInit {

  emailForm!: FormGroup;
  codeForm!: FormGroup;
  passwordForm!: FormGroup;
  showPwd1 = false;
  showPwd2 = false;
  pwdIcon1 = 'eye-outline';
  pwdIcon2 = 'eye-outline';
  emailStep: boolean = false;
  codeStep: boolean = false;
  recoveryStep: boolean = false;

  constructor(private router: Router,
              public formBuilder: FormBuilder,
              private toastService: ToastService,
              private authService: AuthService) { }

  ngOnInit() {
    this.emailStep = true;

    this.emailForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email]]
    });
    this.codeForm = this.formBuilder.group({
      code: ['', [Validators.required]],
    });
    this.passwordForm = this.formBuilder.group({
      password: ['', [ Validators.required]],
      confirmPassword: ['', [ Validators.required]]
    }, {
      validator: this.passwordIsEquals('password', 'confirmPassword')
    });
  }

  get errorControlEmail(){
    return this.emailForm.controls;
  }

  get errorControlCode(){
    return this.codeForm.controls;
  }

  get errorControlPassword(){
    return this.passwordForm.controls;
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

  sendEmail(){
    if(this.emailForm.valid){
      this.emailStep = false;
      this.codeStep = true;
    }
  }
  
  sendCode(){
    if(this.codeForm.valid){
      this.codeStep = false;
      this.recoveryStep = true;
    }

  }

  sendRecovery(){
    if(this.passwordForm.valid){
    }
  }

}
