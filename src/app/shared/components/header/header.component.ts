import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { BehaviorSubject } from 'rxjs';

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
    private themeSvc: ThemeService
  ) { }

  ngOnInit() {
    this.darkMode = this.themeSvc.darkMode
  }

  setTheme(oscuro: boolean){
    //this.darkMode= oscuro; // lo he cambiado por el servicio
    this.themeSvc.setTheme(oscuro);
  }

}
