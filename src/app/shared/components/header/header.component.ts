import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() titulo: string;
  @Input() backButton: string;
  @Input() isModal: boolean;
  @Input() color: string;
  @Input() centerTitle: boolean;

  darkMode: BehaviorSubject<boolean> ;

  constructor(
    private themeSvc: ThemeService,
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {
    this.darkMode = this.themeSvc.darkMode
  }

  //Aplicar el modo Oscuro
  setTheme(darkMode: boolean){
    //this.darkMode= oscuro; // lo he cambiado por el servicio
    this.themeSvc.setTheme(darkMode);
  }

  //cerrar la modal
  dismissModal(){
    this.utilSvc.dismissModal();
  }

  //Navegamos a la pantalla de Login
  toLogin(){
    this.utilSvc.routerLink('/auth');
  }

  //Navegamos a la pantalla de Registro
  toSingUp(){
    this.utilSvc.routerLink('/auth/sign-up');
  }
  
  //Navegamos a la landingPage
  toHome(){
    this.utilSvc.routerLink('/landing');
  }
}
