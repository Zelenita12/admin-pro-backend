
const { Schema, model } = require ('mongoose');

const ObraSchema = Schema ({
    titulo: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    imagen: {
        type: String,
    },

    fecha: { 
        type: Date, 
        required: true 
    },
       
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    artesano: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Artesano'
    },

}, { collection: 'obras'});


ObraSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    return object;

});

module.exports = model( 'Obra', ObraSchema );