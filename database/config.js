const mongoose = require('mongoose');


const dbConnection = async() =>{
    try{

        await mongoose.connect(process.env.DB_CNN_STRING, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('Db Online')

    }catch(error){

        console.log(error);
        throw new Error('Error en la bd - vea logs');
    }


}

module.exports = {
    dbConnection
}