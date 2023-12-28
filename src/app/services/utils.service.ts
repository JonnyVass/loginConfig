import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
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

  // ============== Alertas/Errores (Modal) ==============
  // defino la Utilidad para MOSTRAR la alerta/Error y le paso como parametros los datos para llamarlo desde cualquier lado
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
    await modal.present();
  
    // cuando se cierra la modal, se devuelven algunos datos
    const {data} = await modal.onWillDismiss();
    if (data){
      //si hay datos en el modal, los devuelvo
      return data;
    }
  }

  //defino la Utilidad para CERRAR la alerta/Error y le paso como parametros los datos para llamarlo desde cualquier lado
  dismissModal(data?: any){
    this.modalController.dismiss(data);
  }

  // ========== calculo el % de completado de tarea para el plugin de graficas  ==========
  getPercentage(task: Task){
    // obtengo los Items que ya está completados
    let completedItems = task.items.filter(item => item.completed).length;
    // obtengo el Nº total de Items
    let totalItems = task.items.length;
    // hago la formula para caluclar el %
    let percentage = (100 / totalItems) * completedItems

    return parseInt(percentage.toString()); // devuelvo el Nº entero del %
  }
}
