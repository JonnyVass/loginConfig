import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkMode = new BehaviorSubject(false);


  constructor() { }

  setInicialTheme() {
    // obtenemos el valor del localStorage del tema (cuando recargas la pagina, sino pierde el tema)
    let darkMode = JSON.parse(localStorage.getItem('darkMode'))

    // aplico la misma logica de abajo para poner el tema correcto que hay en el localStorage
    if (darkMode){
      //pogo el tema Oscuro
      document.body.setAttribute('color-theme', 'dark')
    }else{
      //pogo el tema claro
      document.body.setAttribute('color-theme', 'ligth')
    }
  }

  setTheme (darkMode: boolean){
    if (darkMode){
      //pogo el tema Oscuro
      document.body.setAttribute('color-theme', 'dark')
    }else{
      //pogo el tema claro
      document.body.setAttribute('color-theme', 'ligth')
    }

    // asigno el valor que me mandan, para que se cambie en todos los componentes
    this.darkMode.next(darkMode)
    // guardamos el valor en el localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }
}
