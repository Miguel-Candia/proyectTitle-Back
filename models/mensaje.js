const {Schema, model } = require('mongoose');

const MensajeSchema = Schema({

    de:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    para:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    mensaje:{
        type:String,
        required:true
    }
},{
    // add ultima fecha creacion y modificacion
    timestamps:true

})

MensajeSchema.method('toJSON', function(){
    const { __v, ...Object } = this.toObject();
    return Object;

});

module.exports = model('Mensaje', MensajeSchema);

