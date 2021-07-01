import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToastWithOptions(header: string, message: string, duration: number,
    shouldUseCustomeCss? : boolean, showCloseButton? : boolean) {
    const toast = await this.toastController.create({
      header,
      message,
      duration,
      position: 'top',
      cssClass: shouldUseCustomeCss ? 'customToastClass' : '',
      buttons: showCloseButton ? [
        {
          side: 'end',
          text: 'Close',
          role: 'cancel',
          handler: () => {}
        }
      ] : []
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
  }
}
