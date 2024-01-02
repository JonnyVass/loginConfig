import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  
  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //compruebo el estado del autenticado desde Firebase
      return this.firebaseSvc.getAuthState().pipe(map( auth => {
        // comprobamos si NO está autenticado
        if (!auth){
          //indico que si
          return true;
        }else{
          //navegamos a la Home de pa parte Pirvada
          this.utilSvc.routerLink('/tabs');
          //indico que NO
          return false;
        }
      }))

    return true;
  }
  
}
