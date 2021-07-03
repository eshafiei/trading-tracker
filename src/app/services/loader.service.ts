import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public loadingController: LoadingController) { }

  // Show the loader for infinite time
  async showLoader() {
    // this.loadingController.create({
    //   message: 'Please wait...'
    // }).then((res) => {
    //   await res.present();
    // });
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
  }

  // Hide the loader if already created otherwise return error
  async hideLoader() {
    await this.loadingController.dismiss();
  }
}
