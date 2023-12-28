import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {} as User;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // metodo que se ejecuta, cada vez que se entra en la pagina
    // de esta manera si entramos Usuario1, cerramos sesion y entramos Usuario2, cargaría la info del Usuario2

    //obtenemos la informacion del usuario logado (del localStorage)
    this.getUser();
  }

  getUser() {
    // devuelvo los datos del Usuario que tengo LocalStorage
    return this.user = this.utilSvc.getElementInLocalStorage('usuario');
  }

  cerrarSesion() {
    // llamo al utils para motrar la alerta
    this.utilSvc.presentAlert({
      header: 'Cerrar Sesion',
      message: '¿Quieres cerrar la sesion?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Cerrar Sesion',
          handler: () => {
            // ceramos la sesion
            this.firebaseSvc.signOut();
          }
        }
      ]
    })
  }


}
