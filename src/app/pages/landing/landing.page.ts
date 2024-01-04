import { Component, OnInit } from '@angular/core';
import { IntroComponent } from 'src/app/shared/components/intro/intro.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  pricingBoxes = [
    {
      name: 'Clase Unica',
      price: 10,
      features: [
        'Alquiler de Material',
        '2 Horas de practica',
        'Monitor de apoyo'
      ]
    },
    {
      name: 'Curso Iniciacion',
      price: 59,
      features: [
        'Alquiler de Material',
        '20 Horas Generales',
        'Teoría y Practica',
        'Monitor FCMTA'
      ]
    },
    {
      name: 'Curso Tecnificacion',
      price: 99,
      features: [
        'Material del Alumno',
        '10 Horas Específicas',
        'Revision Arco/potencia',
        'Revision Cuerda/flechas',
        'Rutina de tiro'
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
