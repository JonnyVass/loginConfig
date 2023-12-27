import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

// Validador Custom creado para la App
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  // me defino el formulario del login
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl(''),
  })

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {
    // al generar el componente, llamo a las validaciones custom de las contraseñas:
    this.confirmPasswordValidator()
  }

  confirmPasswordValidator(){
    // incluyo las validaciones de este campo:
      // el requerido al igual que en el resto
      // la validacion custom para comprobar que ambas password son las mismas
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls.password)
    ])

    //actualizo los validadores del campo
    this.form.controls.confirmPassword.updateValueAndValidity();
  }

  submit(){
    if (this.form.valid){
      console.log(this.form.value);
      // Activo el Spinner
      this.utilSvc.presentLoading({
        message: 'Registrando...',
        duration: 3000,
        spinner: 'crescent'
      })
      // llamo a Firebase para registrar el usuario
      this.firebaseSvc.signUp(this.form.value as User).then(async res => {
        // capturamos la respuesta y la pintamos en consola
        console.log(res);

        //actualizo en Firebase el nombre del usuario que se está registrando
          // he puesto la respuesta como sync y ahora pongo aqui el await
        await this.firebaseSvc.updateUser({ displayName: this.form.value.name});

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
        // borro el formulario de Registro
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

