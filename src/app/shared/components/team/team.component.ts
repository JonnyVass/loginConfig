import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent  implements OnInit {

  @Input() tituloSeccion: string;

//definimos el arrya con el contenido de las tarjetas
Equipo = [
  { 
    Titulo: 'Jorge Higuera',
    Subtitulo: 'Presidente',
    Imagen: '/assets/avatars/av-2.png',
    Contenido: 'Participamos en Campeonatos de España y en la Liga Nacional de Bosque.' 
  },{ 
    Titulo: 'Jonathan Martin',
    Subtitulo: 'Vicepresidente',
    Imagen: '/assets/avatars/av-8.png',
    Contenido: 'Participamos en las Ligas y Campeonatos de FCMTA en modalidades de: Bosque, Sala y AireLibre.' 
  },{ 
    Titulo: 'David Herencias',
    Subtitulo: 'Secretario',
    Imagen: '/assets/avatars/av-6.png',
    Contenido: 'Participamos en ligas sociales que realizan los clubs a nivel interno.' 
  },{ 
    Titulo: 'Silvia Martin',
    Subtitulo: 'Tesorera',
    Imagen: '/assets/avatars/av-5.png',
    Contenido: 'Siempre que nos permite el calendario, realizamos nuestras propias competiciones en Sala o Bosque.' 
  },{ 
    Titulo: 'Aure Gallardo',
    Subtitulo: 'Vocal',
    Imagen: '/assets/avatars/av-7.png',
    Contenido: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' 
  }
]

  constructor() { }

  ngOnInit() {}

}
