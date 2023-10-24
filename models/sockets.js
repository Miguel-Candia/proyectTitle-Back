

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

        // Validar JWT

        // si token no es valido, Desconecta
        
        //saber que usuario esta activo mediante UID

        // Emitir todos los usuarios conectados

        // Socket join (Unir a salas)

        // Escuchar cuando cliente manda un mensaje

        // disconnect
        // marcar en bd que el usuario se desconecto
        // Emitir todos los usuarios conectados
            
        
        });
    }


}


module.exports = Sockets;