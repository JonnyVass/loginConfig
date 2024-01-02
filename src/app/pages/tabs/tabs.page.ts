import { Component, OnInit } from '@angular/core';
import { Rutas } from 'src/app/models/rutas-model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  //Objeto con los true/false por cada una de las rutas a mostrar
  rutas= {} as Rutas;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // metodo que se ejecuta, cada vez que se entra en la pagina
    // de esta manera si entramos Usuario1, cerramos sesion y entramos Usuario2, cargaría la info del Usuario2

    //obtengo la personalizacion del usuario
    this.getPersonalizacion();
    
    if (!this.rutas.home){
      //El usuario Aun NO está autorizado dentro de la BBDD de Firebase
        //navegamos a la pestaña de NO access
        this.utilSvc.routerLink('/tabs/no-access');
    }else{
      //navegamos a la pestaña de HOME
      this.utilSvc.routerLink('/tabs/home');
    } 
    
  } 

  getPersonalizacion(){
    //obtenemos la personalizacion del Usuario del localStorage
    return this.rutas = this.utilSvc.getElementInLocalStorage('Rutas')    
  }

}
