import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model'
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTaskComponent } from 'src/app/shared/components/add-update-task/add-update-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user = {} as User;
  tasks: Task[] = []
  /*
  [
    {
      id: '1',
      title: 'Autenticacion con Google',
      description: 'crear na funciona que permita autenicar al usuario con Google',
      items: [
        {name:'Lorem ipsum dolor sit amet consectetur adipisicing elit. In repellat, sed est quibusdam, dolorem facere quo eius ab amet unde iusto alias delectus aliquid accusantium excepturi harum dolorum, assumenda blanditiis!', completed:true},
        {name:'actividad 2', completed:false},
        {name:'actividad 3', completed:false}
      ]
    },
    {
      id: '2',
      title: 'Autenticacion con Google',
      description: 'crear na funciona que permita autenicar al usuario con Google',
      items: [
        {name:'actividad 1', completed:true},
        {name:'actividad 2', completed:true},
        {name:'actividad 3', completed:false}
      ]
    },
    {
      id: '3',
      title: 'Autenticacion con Google',
      description: 'crear na funciona que permita autenicar al usuario con Google',
      items: [
        {name:'actividad 1', completed:true},
        {name:'actividad 2', completed:true},
        {name:'actividad 3', completed:true}
      ]
    }
  ] */

  // para saber cuando mostrar o no el loading desde el HTML
  loading: boolean = false;

  getUser() {
    // devuelvo los datos del Usuario que tengo LocalStorage
    return this.user = this.utilSvc.getElementInLocalStorage('usuario');
  }

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // metodo que se ejecuta, cada vez que se entra en la pagina
    // de esta manera si entramos Usuario1, cerramos sesion y entramos Usuario2, cargaría la info del Usuario2

    //obtenemos las tareas de la BBDD
    this.getTask();
    //obtenemos la informacion del usuario logado (del localStorage)
    this.getUser();
  }

  getPercentage(task: Task) {
    return this.utilSvc.getPercentage(task);
  }

  async addOrUpdateTask(task?: Task) {
    // llamamos a la modal para crear o modificar la tarea
    // como al cerrar la modal (desde el componente "add-update-task" cuando creamos/actualizamos la tarea) estamos
    // devolviendo datos, con el "let res =" lo queremos catpurar y tratar
    // para ello el "await" al llamar y el "async" en el metodo
    let res = await this.utilSvc.presentModal({
      component: AddUpdateTaskComponent,
      componentProps: { task },
      cssClass: 'add-update-modal'
    })

    // validamos si ha sido OK/KO
    if (res && res.success) {
      // se ha creado/actualizado la tarea
      // actualizamos de nuevo en pantalla la lista de tareas
      this.getTask();
    }
  }

  getTask() {
    //obtiene las Tareas de la BBDD de Firebase

    //saco la informacion del usuario
    let user: User = this.utilSvc.getElementInLocalStorage('usuario');

    // genero la Ruta para poder acceder a los datos de Firebase
    let path = `users/${user.uid}`;

    // activo el switch del loading
    this.loading = true;
    //obtengo datos de la BBDD
    let sub = this.firebaseSvc.getSubcollection(path, 'tasks').subscribe({
      next: (res: Task[]) => {
        //pinto en consola la respuesta
        console.log(res);
        // inicializo el listado de tareas con la respuesta
        this.tasks = res;
        //me suscribo a la respuesta para que solo al entrar se realicen las peticiones a la BBDD de firebase
        // y de esta manera minimizar las peticiones y poder mantenernos en la capa "Spark" gratuita de firebase
        sub.unsubscribe();
        // DESactivo el switch del loading
        this.loading = false;
      }
    })

  }

  //Aviso de confirmacion para eliminar
  confirmDeleteTask(task: Task) {
    // llamo al utils para motrar la alerta
    this.utilSvc.presentAlert({
      header: 'Eliminar tarea',
      message: '¿Quieres eliminar esta tarea?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Eliminar',
          handler: () => {
            // llamamos al metodo para eliminarla
            this.deleteTask(task);
          }
        }
      ]
    })
  }

  //Borrar una Tarea
  deleteTask(task: Task) {
    //generamos la Ruta de la BBDD
    let path = `users/${this.user.uid}/tasks/${task.id}`;

    //como es una accion con BBDD puede tardar, por tanto mostramos info al usuario por pantalla (modal)
    this.utilSvc.presentLoading({
      message: 'Borrando...',
      duration: 1500,
      spinner: 'crescent'
    });

    //borramos la tarea a la BBDD de firebase
    this.firebaseSvc.deleteSubcollection(path).then(res => {
      // ha funcionado OK

      //mostramos un aviso (toast) al usuario
      this.utilSvc.presentToast({
        message: 'Tarea eliminada correctamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500 // 1,5 segundos
      });
      // actualizamos de nuevo en pantalla la lista de tareas
      this.getTask();

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

}
