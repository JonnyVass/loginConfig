import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
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

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  submit(){
    if (this.form.valid){
      console.log(this.form.value);
      // Activo el Spinner
      this.utilSvc.presentLoading({
        message: 'Autenticando...',
        duration: 3000,
        spinner: 'crescent'
      });
      // llamo a Firebase para hacer el login del usuario
      this.firebaseSvc.login(this.form.value as User).then( res => {
        // capturamos la respuesta y la pintamos en consola
        console.log(res);

        

        // Obtengo la informacion del usuario Registrado desde Firebase (respuesta del servicio)
        let user: User ={
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email
        }
        // Almaceno en el LocalStorage
        this.utilSvc.setElementInLocalStorage('usuario', user);

        // Navegamos a dentro de la parte logada de la App
        this.utilSvc.routerLink('/tabs/home')

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
      }, error =>{
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
      })
    }
  }

}
