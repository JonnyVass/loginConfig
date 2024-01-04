import {  Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  @Input() tituloSeccion: string;

  //Comprobamos si estamos o NO en movil
    // al final he maquetado el componente para que funcione en responsive completo, por lo que NO utilizo esto
    // pero dejo la comprobacion por si lo necesito en un futuro en otro lado
  mobile = false; 

  //definimos el array con el contenido de las tarjetas
  fotos = [
    { 
      Titulo: 'Competiciones Nacionales',
      Imagen: 'assets/img/slide1.jpg',
      Contenido: 'Participamos en Campeonatos de España y en la Liga Nacional de Bosque.' 
    },{ 
      Titulo: 'Competiciones CLM - FCMTA',
      Imagen: 'assets/img/slide2.jpg',
      Contenido: 'Participamos en las Ligas y Campeonatos de FCMTA en modalidades de: Bosque, Sala y AireLibre.' 
    },{ 
      Titulo: 'Competiciones Sociales',
      Imagen: 'assets/img/slide3.jpg',
      Contenido: 'Participamos en ligas sociales que realizan los clubs a nivel interno.' 
    },{ 
      Titulo: 'Competiciones Locales',
      Imagen: 'assets/img/slide4.jpg',
      Contenido: 'Siempre que nos permite el calendario, realizamos nuestras propias competiciones en Sala o Bosque.' 
    }
  ]

  constructor() { }

  ngOnInit() {
    //Comprobamos si estamos o NO en movil
    var isMobile = window.matchMedia("only screen and (max-width: 960px)");
    console.log('el tamaño es movil ?--> ' + isMobile.matches);
    if (isMobile.matches) {
      this.mobile = true;
    }

  }

}
