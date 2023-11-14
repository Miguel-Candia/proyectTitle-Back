const { usuarioConnect, usuarioDisconnect, getUsuarios, grabarMensaje } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

        const [valido, uid] = comprobarJWT(socket.handshake.query['x-token'])

        if( !valido ){
            console.log('Socket no identificado')
            return socket.disconnect();
        }

        await usuarioConnect( uid );

        // unir al usuario a una sala de socket.io
        socket.join(uid);


        // Validar JWT

        // si token no es valido, Desconecta
        
        //saber que usuario esta activo mediante UID

        // Emitir todos los usuarios conectados

        this.io.emit('lista-usuario', await getUsuarios())


        // Socket join (Unir a salas)

        // Escuchar cuando cliente manda un mensaje
        socket.on ( 'mensaje-personal', async ( payload ) =>{

            const mensaje = await grabarMensaje(payload);

            this.io.to( payload.para ).emit( 'mensaje-personal', mensaje )
            this.io.to( payload.de ).emit( 'mensaje-personal', mensaje )

        } );

        // disconnect
        // marcar en bd que el usuario se desconecto
        // Emitir todos los usuarios conectados
        socket.on('disconnect', async() =>{
            console.log('Cliente Desconectado',uid);
            await usuarioDisconnect( uid );
            this.io.emit('lista-usuario', await getUsuarios())
        })
            
        
        });
    }


}


module.exports = Sockets;