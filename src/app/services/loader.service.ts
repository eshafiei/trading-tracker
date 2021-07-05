import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public loadingController: LoadingController) { }

  // Show the loader for infinite time
  async showLoader() {
    await this.loadingController.create({
      message: 'Please wait...'
    }).then((res) => {
      res.present();
    });
  }

  // Hide the loader if already created otherwise return error
  async hideLoader() {
    await this.loadingController.dismiss();
  }
}
