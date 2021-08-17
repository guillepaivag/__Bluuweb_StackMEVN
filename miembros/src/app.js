if(process.env.NODE_ENV === 'production'){
    require('dotenv').config()
}

const uriDB = process.env.MONGODB_NOTASMEVN

// const express = require('express')
// const morgan = require('morgan')
// const cors = require('cors')
// const path = require('path')
// const history = require('connect-history-api-fallback')
// const mongoose = require('mongoose')

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import history from 'connect-history-api-fallback'
import mongoose from 'mongoose'

const app = express()
mongoose.connect(uriDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then((db) => {
    console.log('Base de datos conectada!')
}).catch((err) => {
    console.log('¡¡¡Error!!!: ' + err)
})

// config
app.set('port', process.env.PORT || 3002)

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(history())

// rutas
app.use('/api', require('./routes/nota'))

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
    console.log('localhost:'+app.get('port'))
})