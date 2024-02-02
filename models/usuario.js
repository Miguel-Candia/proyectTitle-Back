const {Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    experto:{
         type:Boolean,
         default:false
     },
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    online:{
        type:Boolean,
        default:false
    },
     tituloprofesional:{
         type:String,
    },
    sobremi:{
         type:String,

     },
     experiencia:{
         type:String,

     },
     licenciasycertificaciones:{
         type:String,

     },
     conocimientosyaptitudes:{
         type:String,

     }
})

UsuarioSchema.method('toJSON', function(){
    const { __v,_id, password, ...Object } = this.toObject();
    Object.uid = _id;
    return Object;

});

module.exports = model('Usuario', UsuarioSchema);

