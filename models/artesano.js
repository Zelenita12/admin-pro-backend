
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

    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },

    ciudad: {
        type: String,
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
        _id: { type: Schema.Types.ObjectId, ref: 'Usuario' }

    }],


});

ArtesanoSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    return object;
    
});

module.exports = model( 'Artesano', ArtesanoSchema );