export interface Rutas{
    home: boolean,
    reservas: boolean,
    licencia: boolean
    // Pte de añadir el resto de Rutas al modelo
}

/*
Añadir Usuario en Firebase
    Autentication -> User -> Copiar el usuario a incluir

    Cloud Firestore 
        -> Dentro de "users" agregar dodumento
            pegamos el ID del usuario copiado y SIN CAMPOS
        -> dentro de ese documento creado "iniciarColeccion":
            Collecion -> rutas
            ID de documento -> ruta
        -> dentro de "ruta" añadir campos:
            home
            licencia
            reservas
    



*/