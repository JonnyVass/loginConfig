import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-instalaciones',
  templateUrl: './instalaciones.component.html',
  styleUrls: ['./instalaciones.component.scss'],
})
export class InstalacionesComponent  implements OnInit {

  @Input() tituloSeccion: string;

  instalaciones = [
    {
      Icono: 'map-outline',
      Titulo: 'Recorrido 3D',
      Contenido: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quas, dicta nulla cupiditate eos, quo dolores exercitationem iure laudantium repellendus nam vero. Consequatur, voluptate tempore. Nostrum rerum blanditiis molestias sint.' 
    },{
      Icono: 'locate-outline',
      Titulo: 'Polideportivo',
      Contenido: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quas, dicta nulla cupiditate eos, quo dolores exercitationem iure laudantium repellendus nam vero. Consequatur, voluptate tempore. Nostrum rerum blanditiis molestias sint.' 
    }
  ]

  constructor() { }

  ngOnInit() {}

}
