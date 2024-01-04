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
      Titulo: '2º Puesto 3D Indoor RFETA',
      Imagen: 'assets/img/slide1.jpg',
      Contenido: 'En la edicion del 2019 en Marinador, Silvia alanzó la medalla de Plata, Enhorabuena!!!!! Esta es la primera medalla Nacional del Club' 
    },{ 
      Titulo: 'Cto 3D FCMTA 2023',
      Imagen: 'assets/img/slide2.jpg',
      Contenido: 'El Ranking de los 3 participantes fue: 2º Puesto Compuesto Femenino // 3º y 4º Puesto Longbow Masculino' 
    },{ 
      Titulo: '1º Puesto 3D Indoor FCMTA',
      Imagen: 'assets/img/slide3.jpg',
      Contenido: 'En la edicion del 2024 en Valdeluz, Silvia se alzó con la Victoria ocupando el Oro en el cajón' 
    },{ 
      Titulo: 'Liga Interclubes 2023',
      Imagen: 'assets/img/slide4.jpg',
      Contenido: 'En la tirada de Tomelloso, el Ranking de nuestros arquer@s fue: 3º y 5º Puesto Compuesto Femenino // 1º Puesto Longbow Masculino' 
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
