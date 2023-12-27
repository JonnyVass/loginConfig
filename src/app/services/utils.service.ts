import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  // ============== LOADING (Spinner) ==============
  // defino la Utilidad para ACTIVAR el Spinner y le paso como parametros los datos para llamarlo desde cualquier lado
  async presentLoading(opts: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

  // defino la Utilidad para DESACTIVAR el Spinner
  async dismissLoading(){
    return await this.loadingController.dismiss()
  }

  // ============== Alertas/Errores (Toast) ==============
  // defino la Utilidad para MOSTRAR la alerta/Error y le paso como parametros los datos para llamarlo desde cualquier lado
  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }
  

  // ============== Funciones para trabajar con el LocalStorage ==============
  setElementInLocalStorage(key: string, element: any){
    // incluye cualquier elemento en el localStorage
    return localStorage.setItem(key, JSON.stringify(element));
  }

  getElementInLocalStorage(key: string){
    // obtiene cualquier elemento del localStorage
    return JSON.parse(localStorage.getItem(key));
  }

  // ============== Funciones para trabajar con el Router link ==============
  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

  // ============== Alertas/Errores (Alert) ==============
  // defino la Utilidad para MOSTRAR la alerta/Error y le paso como parametros los datos para llamarlo desde cualquier lado
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);  
    await alert.present();
  }
}
