
const { Schema, model } = require ('mongoose');

const ArtesanoSchema = Schema ({
    nombre: {
        type: String,
        required: true
    },

    img: {
        type: String,
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },


    municipio: {
        type: Schema.Types.ObjectId,
        ref: 'Municipio',
        required: true
    },

    telefono: {
        type: String,
    },

    descripcionArt: {
        type: String,
        maxlength: 35,
    },

    obras: [{
        type: Schema.Types.ObjectId,
        ref: 'Obra'
    }],


});

ArtesanoSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    return object;
    
});

module.exports = model( 'Artesano', ArtesanoSchema );