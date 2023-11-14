import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async success(message: string, duration: number, position: 'top' | 'bottom'){
    const toast = await this.toastController.create({
      message: message,
      icon: 'checkmark-circle',
      buttons: [{
        icon: 'close',
        role: 'cancel'
      }],
      duration: duration,
      position: position,
      cssClass: 'success-toast custom-toast'
    });

    await toast.present();
  }

  async warn(message: string, duration: number, position: 'top' | 'bottom'){
    const toast = await this.toastController.create({
      message: message,
      icon: 'alert',
      buttons: [{
        icon: 'close',
        role: 'cancel'
      }],
      duration: duration,
      position: position,
      cssClass: 'warn-toast custom-toast'
    });

    await toast.present();
  }

  async error(message: string, duration: number, position: 'top' | 'bottom'){
    const toast = await this.toastController.create({
      message: message,
      icon: 'warning',
      buttons: [{
        icon: 'close',
        role: 'cancel'
      }],
      duration: duration,
      position: position,
      cssClass: 'error-toast custom-toast'
    });

    await toast.present();
  }

  async info(message: string, duration: number, position: 'top' | 'bottom'){
    const toast = await this.toastController.create({
      message: message,
      icon: 'information-circle',
      buttons: [{
        icon: 'close',
        role: 'cancel'
      }],
      duration: duration,
      position: position,
      cssClass: 'info-toast custom-toast'
    });

    await toast.present();
  }

}
