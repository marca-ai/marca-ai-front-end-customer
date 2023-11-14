import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.page.html',
  styleUrls: ['./recovery-password.page.scss'],
})
export class RecoveryPasswordPage implements OnInit {

  showPwd1 = false;
  showPwd2 = false;
  pwdIcon1 = 'eye-outline';
  pwdIcon2 = 'eye-outline';
  emailStep: boolean = false;
  codeStep: boolean = false;
  recoveryStep: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.emailStep = true;
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
    this.emailStep = false;
    this.codeStep = true;
  }
  
  sendCode(){
    this.codeStep = false;
    this.recoveryStep = true;
  }

  sendRecovery(){
    
  }

}
