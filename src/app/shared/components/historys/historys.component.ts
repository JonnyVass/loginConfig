import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-historys',
  templateUrl: './historys.component.html',
  styleUrls: ['./historys.component.scss'],
})
export class HistorysComponent  implements OnInit {

  @Input() tituloSeccion: string;

  historys = [
    {
      Titulo: 'Competiciones Nacionales',
      Imagen: 'https://www.hostinger.es/_ipx/f_webp/h-assets/images/pages/website-builder/johns-portfolio-2x.png',
      Contenido: 'Participamos en Campeonatos de España y en la Liga Nacional de Bosque.' 
    },
    {
      Titulo: 'Competiciones Autonomicas',
      Imagen: 'https://www.hostinger.es/_ipx/f_webp/h-assets/images/pages/website-builder/matcha-tea-2x.png',
      Contenido: 'Participamos en las Ligas y Campeonatos de FCMTA en modalidades de: Bosque, Sala y AireLibre.' 
    },
    {
      Titulo: 'Competiciones Sociales',
      Imagen: 'https://www.hostinger.es/_ipx/f_webp/h-assets/images/pages/website-builder/support-2x-new.png',
      Contenido: 'Participamos en ligas sociales que realizan los clubs a nivel interno.' 
    },
    {
      Titulo: 'Competiciones Propias',
      Imagen: 'https://www.hostinger.es/_ipx/f_webp/h-assets/images/pages/website-builder/integrations-2x.png',
      Contenido: 'Siempre que nos permite el calendario, realizamos nuestras propias competiciones en Sala o Bosque.' 
    }
  ]

  constructor() { }

  ngOnInit() {}

}
