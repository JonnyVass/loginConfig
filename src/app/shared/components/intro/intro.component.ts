import {  Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  @Input() tituloSeccion: string;

  //Comprobamos si estamos o NO en movil
  mobile = false;

  //definimos el array con el contenido de las tarjetas
  tarjetas = [
    { 
      Titulo: 'Competiciones',
      Subtitulo: 'Nacionales',
      Imagen: 'https://ionicframework.com/docs/img/demos/card-media.png',
      Contenido: 'Participamos en Campeonatos de España y en la Liga Nacional de Bosque.' 
    },{ 
      Titulo: 'Competiciones',
      Subtitulo: 'CLM - FCMTA',
      Imagen: 'https://ionicframework.com/docs/img/demos/card-media.png',
      Contenido: 'Participamos en las Ligas y Campeonatos de FCMTA en modalidades de: Bosque, Sala y AireLibre.' 
    },{ 
      Titulo: 'Competiciones',
      Subtitulo: 'Sociales',
      Imagen: 'https://ionicframework.com/docs/img/demos/card-media.png',
      Contenido: 'Participamos en ligas sociales que realizan los clubs a nivel interno.' 
    },{ 
      Titulo: 'Competiciones',
      Subtitulo: 'Locales',
      Imagen: 'https://ionicframework.com/docs/img/demos/card-media.png',
      Contenido: 'Siempre que nos permite el calendario, realizamos nuestras propias competiciones en Sala o Bosque.' 
    },{ 
      Titulo: 'FIN',
      Subtitulo: 'FIN',
      Imagen: '/assets/avatars/av-5.png',
      Contenido: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' 
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
