import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

//Carrusell (importacion para toda la App)
import { register } from 'swiper/element/bundle';

// inicializo el carrusell
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(
    private themeSvc: ThemeService
  ) {

    this.themeSvc.setInicialTheme()
  }

 

}
