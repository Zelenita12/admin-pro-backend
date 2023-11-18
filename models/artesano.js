
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

    obras: [{
        usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
        titulo: { type: String, required: true },
        descripcion: { type: String, required: true },
        imagen: { type: String, required: false },
        fecha: { type: Date, required: true },
        _id: { type: Schema.Types.ObjectId, ref: 'Obra' }

    }],


});

ArtesanoSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    return object;
    
});

module.exports = model( 'Artesano', ArtesanoSchema );