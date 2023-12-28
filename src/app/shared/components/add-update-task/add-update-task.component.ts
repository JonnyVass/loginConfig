import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Item, Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
})
export class AddUpdateTaskComponent  implements OnInit {

  @Input() task: Task;

  user = {} as User;

  // defino el formulario con los mismos datos que tiene una tarea
  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    items: new FormControl([], [Validators.required, Validators.minLength(1)]),
  });

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {
    // obtengo los datos del usuario
    this.user = this.utilSvc.getElementInLocalStorage('usuario');

    // si estoy actualizando una tarea, relleno el formulario con los datos de esa tarea
    if (this.task){
      //relleno el formulario de pantalla
      this.form.setValue(this.task);
      // actualizo y valido el formulario
      this.form.updateValueAndValidity();
    }
  }

  getPercentage(){
    return this.utilSvc.getPercentage(this.form.value as Task);
  }

  //para ordear el listado de actidades
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // Sacado de la documentacion de Ionic
    // esto se supone que te permite reordenar las actividades de una tarea
    this.form.value.items = ev.detail.complete(this.form.value.items);
    // actualizo y valido el formulario
    this.form.updateValueAndValidity();
  }

  // crear o actualizar la tarea
  submit(){
    //1º comprobamos que el formulario sea Valido
    if (this.form.valid){
      //comprobamos si estamos creando o actualizando
      if (this.task){
        // estamos actualizando la tarea xq ya existe
        this.updateTask();
      }else{
        // estamos creando la tarea xq NO existe
        this.createTask();
      }

    }
     
  }

  //crear una Tarea
  createTask(){
    //generamos la Ruta de la BBDD
    let path = `users/${this.user.uid}`;

    //como es una accion con BBDD puede tardar, por tanto mostramos info al usuario por pantalla (modal)
    this.utilSvc.presentLoading({
      message: 'Guardando...',
      duration: 1500,
      spinner: 'crescent'
    });
      //borro el ID del formulario xq no me hace falta y para que se genere uno random
    delete this.form.value.id;

    //añado la tarea a la BBDD de firebase
      //this.form.value -> como hemos creado el formulario con los mismos cambios que hay en la BBDD
    this.firebaseSvc.addSubcollection(path, 'tasks', this.form.value).then(res => {
      // ha funcionado OK

      // cerramos la modal (desde la que creamos la tarea)
      this.utilSvc.dismissModal({ success: true});
      //mostramos un aviso (toast) al usuario
      this.utilSvc.presentToast({
        message: 'Tarea creada correctamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500 // 1,5 segundos
      });
      // quitamos el loading
      this.utilSvc.dismissLoading();
    }, error => {
      // hay un error

      //mostramos un aviso (toast) con el error al usuario
      this.utilSvc.presentToast({
        message: error,
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000 // 5 segundos
      });
      // quitamos el loading
      this.utilSvc.dismissLoading();
    })
  }

  //Actualizar una Tarea
  updateTask(){
    //generamos la Ruta de la BBDD
    let path = `users/${this.user.uid}/tasks/${this.task.id}`;

    //como es una accion con BBDD puede tardar, por tanto mostramos info al usuario por pantalla (modal)
    this.utilSvc.presentLoading({
      message: 'Actualizando...',
      duration: 1500,
      spinner: 'crescent'
    });
      //borro el ID del formulario xq no me hace falta y para que se genere uno random
    //delete this.form.value.id;

    //modifico la tarea a la BBDD de firebase
      //this.form.value -> como hemos creado el formulario con los mismos cambios que hay en la BBDD
    this.firebaseSvc.updateSubcollection(path, this.form.value).then(res => {
      // ha funcionado OK

      // cerramos la modal (desde la que creamos la tarea)
      this.utilSvc.dismissModal({ success: true});
      //mostramos un aviso (toast) al usuario
      this.utilSvc.presentToast({
        message: 'Tarea actualizada correctamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500 // 1,5 segundos
      });
      // quitamos el loading
      this.utilSvc.dismissLoading();
    }, error => {
      // hay un error

      //mostramos un aviso (toast) con el error al usuario
      this.utilSvc.presentToast({
        message: error,
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000 // 5 segundos
      });
      // quitamos el loading
      this.utilSvc.dismissLoading();
    })
  }

  //para eliminar una de las actividades
  removeItem(index: number){
    //eliminamos 1 elemento accediendo a la posicion indicada
    this.form.value.items.splice(index, 1);
    // actualizo y valido el campo de items
    this.form.controls.items.updateValueAndValidity();
  }

  //para crear una actividad
  createItem(){
    // abro un alert custom
    this.utilSvc.presentAlert({
      header: 'Nueva Actividad',
      backdropDismiss: false, //para que al pinchar fuera, NO se salga del Alert
      inputs: [
        {
          name: 'name',
          type: 'textarea',
          placeholder: 'Hacer algo ...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Añadir',
          handler: (res) => {
            // Obtenemos lo que se ha introducido:
              // res.name --> el nombre del input de arriba

            //reEstructuro los datos
            let item: Item = {
              name: res.name,
              completed: false
            };
            //añado el elemento a la lista
            this.form.value.items.push(item);
            // actualizo y valido el campo de items
            this.form.controls.items.updateValueAndValidity();
          }
        }
      ]
    })
  }

}
