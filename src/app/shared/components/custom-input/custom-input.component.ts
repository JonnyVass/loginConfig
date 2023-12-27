import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() icon: string;
  @Input() type: string;
  @Input() autocomplete: string;

  isPassword: boolean;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {
    // compruebo si es una contraseña para poder mostrar el ojito
    if(this.type == 'password') this.isPassword=true;
  }

  showOrHidePassword(){
    //para montar la funcionalidad del Ojito para mostrar u ocultar el contenido del input

    // cambio el valor de la propiedad por su contraria cada vez
    this.hide = !this.hide
    // compruebo el valor para asignar el tipo correcto al input
    if(this.hide){
      // si está oculto, el input es de tipo password
      this.type = 'password'
    }else{
      // si NO está oculto, en input es de tipo Texto plano
      this.type = 'text'
    }
  }

}
