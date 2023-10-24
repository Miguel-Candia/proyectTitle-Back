const { responde } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req,res) =>{

    try{
        const {email,password} = req.body;

        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'Correo ya existe'
            })
        }

        const usuario = await Usuario( req.body );

        // TODO: Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );



        // Guardar usuario en BD
        await usuario.save();

        //  Generar el JWT
        const token = await generarJWT ( usuario.id );
        
        

        res.json({
            ok: true,
            usuario,
            token
        })

    }catch(err)
    {
        console.log(err);

        res.status(500).json({
            ok:false,
            msg: 'Hable con el Administrador'
        })

    }



}

const login = async(req,res) =>{

    const {email,password} = req.body;

    try{
        // verificamos si existe el correo en la bd
        const usuarioBD = await Usuario.findOne({email});
        if( !usuarioBD ){
            return res.status(404).json({
                ok:false,
                msg:'Email no encontrado'
            })
        }

        //validar Password

        const validPassword = bcrypt.compareSync(password, usuarioBD.password);

        if( !validPassword ){
            return res.status(400).json({
                ok:false,
                msg:'password no es correcto'
            })
        }

        //Genera el JWT
        const token = await generarJWT( usuarioBD.id );

        
    res.json({
        ok:true,
        usuario: usuarioBD,
        token
    })
    }catch(err){

        console.log(err);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el Administrador'
        })

    }


}

const renewToken = async(req,res) =>{

    const uid = req.uid;

    //Generar nuevo JWT
    const token = await generarJWT( uid );

    // obtener el usuario por  UID
    const usuario = await Usuario.findById( uid );

    res.json({
        ok:true,
        token,
        usuario
    })
}


module.exports ={
    crearUsuario,
    login,
    renewToken
}