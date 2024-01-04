import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';
import { Rutas } from 'src/app/models/rutas-model';
import { User } from 'src/app/models/user.model';
import { FirebaseRemoteConfigService } from 'src/app/services/firebase-remote-config.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  // me defino el formulario del login
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  //Rutas que tiene permitidas el usuario
  rutas: Rutas;

  //listado de usuarios de la remoteConfig
  usuarios: string[] = [];
  //prueba String
  cadena: string;
  //prueba number
  num: number;
  prueba:any;
  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService,
    //private configFirebase: FirebaseRemoteConfigService //remoteConfig
    private remoteConfig: AngularFireRemoteConfig
  ) { }

  ngOnInit() {
    //al usar AngularFireRemoteConfig ya NO es necesario tener metodos custom para obtener la RemoteConfig
      //this.configFirebase.getnumberByKey('prueba').then((valor: String) => this.usuarios.push(valor);
      //remoteConfig
      //this.configFirebase.getNumeroConfig('numero').then((valor: number) => this.num = valor );
      //remoteConfig
      //this.configFirebase.getCadenaConfig('cadena').then((valor: string) => this.cadena = valor );

    // esta sería la forma de obtenerlos usando AngularFireRemoteConfig
      //obtener un String
    this.remoteConfig.getString('cadena').then((valor: string) => this.cadena = valor );
      //obtener un Numerico
    this.remoteConfig.getNumber('numero').then((valor: number) => this.num = valor );
      //obtener un Mapa/array
        //quedaría defnir la interface/modelo y poder setearlo directamente
    this.remoteConfig.getString('Default').then((valor: string) => this.prueba = JSON.parse(valor) );
    
  }

  async submit() {
    if (this.form.valid) {
      let autorizado: boolean;
      let usu:string;
      //console.log('Valor del formulario ->');
      //console.log(this.form.value);
      // Activo el Spinner
      this.utilSvc.presentLoading({
        message: 'Autenticando...',
        duration: 3000,
        spinner: 'crescent'
      });
      // llamo a Firebase para hacer el login del usuario
      let sub = await this.firebaseSvc.login(this.form.value as User).then( async res => {
        // capturamos la respuesta y la pintamos en consola
        //console.log('Respuesta login con Firebase');
        //console.log(res);

        // Obtengo la informacion del usuario Registrado desde Firebase (respuesta del servicio)
        let user: User = {
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email
        }
          //me quedo con el uid del usuario para usarlo fuera
        usu = res.user.uid
        // Almaceno en el LocalStorage
        this.utilSvc.setElementInLocalStorage('usuario', user);

        // desactivo el Spinner
        this.utilSvc.dismissLoading();

        // Aviso al usuario por pantalla OK
        this.utilSvc.presentToast({
          message: `Te datos la bienvenida ${user.name}`,
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'person-outline'
        });

        // borro el formulario de login
        this.form.reset();
        
      }, error => {
        // capturamos el error y lo pintamos en consola
        console.log(error);
        // desactivo el Spinner
        this.utilSvc.dismissLoading();

        // Aviso al usuario por pantalla ERROR
        this.utilSvc.presentToast({
          message: error,
          duration: 5000,
          color: 'warning',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      });
      
      // recuperamos las Rutas permitidas para el usuario
        //y navegamos donde toca de la parte Privada
      this.getRutas(usu);
      /*
      this.getRutas(usu).then(res =>{
        if (res){
          // tiene autorizada la entrada
          //navegamos a la pestaña de HOME
          this.utilSvc.routerLink('/tabs/home');
          console.log('compobar rutas --> Autorizado');
        }else{
          // NO tiene autorizada la entrada
          //navegamos a la pestaña de NO access
          this.utilSvc.routerLink('/tabs/no-access');
          console.log('compobar rutas --> NO Autorizado');
        }
      });

      // Navegamos a dentro de la parte logada de la App
        //this.utilSvc.routerLink('/tabs');
      /*
      //Navego a la ruta que tenga permitidas el usuario dentro de la parte logada de la App
      console.log('antes de compobar rutas');
      if (autorizado){
        // tiene autorizada la entrada
        //navegamos a la pestaña de HOME
        this.utilSvc.routerLink('/tabs/home');
        console.log('compobar rutas --> Autorizado');
      }else{
        // NO tiene autorizada la entrada
        //navegamos a la pestaña de NO access
        this.utilSvc.routerLink('/tabs/no-access');
        console.log('compobar rutas --> NO Autorizado');
      }
      */


    }
  }


  getRutas(usuario: string) {
    //se contecta con la BBDD para obtener las rutas permitidas y lo almacena en el localStorage

    // genero la Ruta para poder acceder a los datos de Firebase
    let path = `users/${usuario}`;
      //console.log(`Ruta BBDD getRutas -> users/${usuario}`)

      //declaro la variable que seteo despues de obtener los valores
      //let rutas: Rutas;
    let autorizado: boolean;

    
    // llamo a Firebase para Obtener las rutas permitidas del usuario
    let sub = this.firebaseSvc.getSubcollection(path, 'rutas').subscribe({
      next: async (res: Rutas[]) => {
        //pinto en consola la respuesta
        console.log('Respuesta rutas BBDD');
        console.log(res);

        //console.log(res.length);
        //console.log(res[0].length);
        // valido si el usuario está admitido o NO

        if (res.length > 0) {
          // si este campo existe, ya está Autorizado el usuario
          // Obtengo las rutas permitidas del usuario Registrado (respuesta del servicio)
          this.rutas = {
            home: res[0].home,
            reservas: res[0].reservas,
            licencia: res[0].licencia
            // Pte de añadir el resto de Rutas al modelo
          }
          autorizado = res[0].home;
        } else {
          //si NO existe, hay que incluirlo dentro de la BBDD de Firebase
          //seteo unos valores por defecto
          this.rutas = {
            home: false,
            reservas: false,
            licencia: false
            // Pte de añadir el resto de Rutas al modelo
          }
          autorizado = false; 
        }
        // Almaceno en el LocalStorage
        console.log('almaceno Rutas en el LocalStorage');
        this.utilSvc.setElementInLocalStorage('Rutas', this.rutas);
        //me suscribo a la respuesta para que solo al entrar se realicen las peticiones a la BBDD de firebase
        // y de esta manera minimizar las peticiones y poder mantenernos en la capa "Spark" gratuita de firebase
        sub.unsubscribe();
        //return this.rutas.home;
        if (autorizado){ 
          // tiene autorizada la entrada
          //navegamos a la pestaña de HOME
          this.utilSvc.routerLink('/tabs/home');
          console.log('compobar rutas --> Autorizado');
        }else{
          // NO tiene autorizada la entrada
          //navegamos a la pestaña de NO access
          this.utilSvc.routerLink('/tabs/no-access');
          console.log('compobar rutas --> NO Autorizado');
        }
      }
    })
    //return this.rutas.home; 
  }

}
