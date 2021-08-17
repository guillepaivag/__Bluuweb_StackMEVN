// const {Router} = require('express')
// const NotaDB = require('../models/NotasDB')
import {Router} from 'express'
import NotaDB from '../models/NotasDB'

const router = Router()

router.get('/nota', async (req, res) => {
    try {
        const notas = await NotaDB.find()
        console.log(notas)
        res.json(notas)
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
})

router.get('/nota/:id', async (req, res) => {
    const _id = req.params.id
    
    try{
        const nota = await NotaDB.findOne({_id})
        console.log(nota)
        res.status(200).json(nota)
    }catch(err) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error: err
        })
    }
})

router.post('/nueva-nota', async (req, res) => {
    const body = req.body

    try{
        const nota = await NotaDB.create(body)

        res.status(200).json(nota)
    }catch(err){
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error: err
        })
    }
})

router.delete('/nota/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const notaEliminada = await NotaDB.findByIdAndDelete({_id})

        if(!notaEliminada){
            res.status(400).json({
                mensaje: 'No existe id'
            })
        }

        res.status(200).json(notaEliminada)
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
})

router.put('/nota/:id', async (req, res) => {
    const _id = req.params.id
    const body = req.body

    try {
        const notaActualizada = await NotaDB.findByIdAndUpdate({_id}, body, {new: true})

        res.status(200).json(notaActualizada)
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
})


module.exports = router