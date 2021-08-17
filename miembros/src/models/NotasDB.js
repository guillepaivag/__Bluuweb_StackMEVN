// const mongoose = require('mongoose')
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const NotasSchema = new Schema({
    usuarioID: String,
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    descripcion: String,
    date: {
        type: Date,
        default: Date.now()
    },
    activo: {
        type: Boolean,
        default: true
    }
})

// module.exports = mongoose.model('Nota', NotasSchema)
export default mongoose.model('Nota', NotasSchema)