import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MaskitoOptions } from '@maskito/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  loggedUser: User;
  loading: boolean = false;

  readonly phoneMask: MaskitoOptions = {
    mask: [
      '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/
    ],
  };
  
  constructor(private authService: AuthService,
              private customerService: CustomerServiceService,
              private toastService: ToastService,
              private alertController: AlertController) { }

  ngOnInit() {
    this.authService.loggedUser.subscribe({
      next: (response) => {
        this.loggedUser = response;
      }
    });
  }

  removePhoto(){
    this.loading = true;
    this.customerService.removeProfilePicture().subscribe({
      next: (response) => {
        this.toastService.success(response.message, 5000, 'top');
        this.loading = false;
      },
      error: (error) => {
        this.toastService.error('Erro ao remover foto', 5000, 'top');
        this.loading = false;
      }
    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.loading = true;
    this.customerService.setProfilePicture(file).subscribe({
      next: (response) => {
        this.loggedUser.profilePicture = response.data[0];
        this.loading = false;
        this.toastService.success(response.message, 5000, 'top');
      },
      error: (error) => {
        this.loading = false;
        this.toastService.error('Erro ao alterar foto de perfil', 5000, 'top');
      }
    });
  }

  async logout(){
    const alert = await this.alertController.create({
      header: 'Tem certeza que deseja sair?',
      message: 'Caso confirme você será redirecionado para a tela de login.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.authService.logout();
          },
        },
      ],
    });

    await alert.present();
    
  }

}
