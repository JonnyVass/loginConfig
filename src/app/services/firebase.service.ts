import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { getAuth, updateProfile } from 'firebase/auth'
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private utilSvc: UtilsService
  ) { }

  // ======== Autenticacion ========

  login(user: User){
    // metodo para hacer login con los campos del formulario
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
  }

  signUp(user: User){
    // metodo para hacer registro con los campos del formulario
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
  }

  updateUser(user: any){
    // metodo para actualizar los datos del usuario en Firebase
    // obtenemos la autenticacion
    const auth = getAuth();
    // le pasamos los datos a Firebase
    return updateProfile(auth.currentUser, user)
  }

  getAuthState(){
    //metodo que devuelve si estamos o no Autenticados
    return this.auth.authState
  }

  async signOut(){
    //metodo que realiza el logOut de Firebase
    await this.auth.signOut();
    // Navegamos a la pantalla del login
    this.utilSvc.routerLink('/auth');
    //Borramos los datos del localStorage
    localStorage.removeItem('usuario')
  }

  // ======== BBDD de Firebase ========
  getSubcollection(path: string, SubcollectionName: string){
    //obtiene las subcolecciones de la BBDD de Firebase
    return this.db.doc(path).collection(SubcollectionName).valueChanges({idField: 'id'});
        // se pone {idField: 'id'} para que nos devuelva el id de la subcoleccion, para poder luego modificar/eliminar
  }

  addSubcollection(path: string, SubcollectionName: string, object: any){
    //añade las subcolecciones de la BBDD de Firebase
    return this.db.doc(path).collection(SubcollectionName).add(object);
        // nos genera directamente una subcoleccion con un "id" Aleatorio
  }

  updateSubcollection(path: string, object: any){
    //actualiza la subcoleccion de la BBDD de Firebase
    return this.db.doc(path).update(object);
        
  }

  deleteSubcollection(path: string){
    //Borra la subcoleccion de la BBDD de Firebase
    return this.db.doc(path).delete();
        
  }

}
