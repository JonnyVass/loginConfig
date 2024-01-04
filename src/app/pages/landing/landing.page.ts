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
      name: 'Clase Única',
      price: 10,
      features: [
        'Alquiler de Material',
        '2 Horas de práctica',
        'Monitor de apoyo'
      ]
    },
    {
      name: 'Curso Iniciación',
      price: 59,
      features: [
        'Alquiler de Material',
        '20 Horas Generales',
        'Teoría y Práctica',
        'Monitor FCMTA'
      ]
    },
    {
      name: 'Curso Tecnificación',
      price: 99,
      features: [
        'Material del Alumno',
        '10 Horas Específicas',
        'Ajuste Arco/Potencia',
        'Ajuste Cuerda/Flechas',
        'Cear rutina de tiro'
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
