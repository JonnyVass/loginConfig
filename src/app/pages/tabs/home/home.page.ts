import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: Task[] = [
    {
      id: '1',
      title: 'Autenticacion con Google',
      description: 'crear na funciona que permita autenicar al usuario con Google',
      items: [
        {name:'actividad 1', completed:true},
        {name:'actividad 2', completed:false},
        {name:'actividad 3', completed:false}
      ]
    },
    {
      id: '2',
      title: 'Autenticacion con Google',
      description: 'crear na funciona que permita autenicar al usuario con Google',
      items: [
        {name:'actividad 1', completed:true},
        {name:'actividad 2', completed:false},
        {name:'actividad 3', completed:false}
      ]
    },
    {
      id: '3',
      title: 'Autenticacion con Google',
      description: 'crear na funciona que permita autenicar al usuario con Google',
      items: [
        {name:'actividad 1', completed:true},
        {name:'actividad 2', completed:false},
        {name:'actividad 3', completed:false}
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
