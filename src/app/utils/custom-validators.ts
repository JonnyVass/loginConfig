import { AbstractControl } from "@angular/forms";


export class CustomValidators{

    static matchValues(toCompare: AbstractControl){
        // metodo para validar que las contraseñas en el registro coinciden

        return (control: AbstractControl) =>{
            if(control.value !== toCompare.value){
                // control.value -> valor del componente
                // toCompare.value --> valor a comparar

                // devuelvo un error
                return {
                    noMatch: true
                }
            }else{
                // devuelvo un OK (NO error)
                return null
            }
        }
    }
}