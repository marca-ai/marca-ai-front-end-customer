import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private authService: AuthService,
              private toastService: ToastService) {}

  ngOnInit(): void {
    this.authService.recoveryUserByToken().subscribe({
      next: (response) => {
        this.authService.loggedUser.next(response.data[0]);
      },
      error: (error) => {
        this.toastService.error(error.error.message, 5000, 'top');
        this.authService.logout();
      }
    })
  }

}
