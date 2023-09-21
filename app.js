console.clear;
import express from 'express';

const PORT  = 3000;
const expressApp = express()

//Middelware sirven para recibir el body
expressApp.use(express.json())
expressApp.use(express.text())


expressApp.post('/cuenta', (req, res) => {
    console.log(req.query)
    /* res.status(400).send({
        errroMessage: "NO autorizado"
    }) */
    res.send("tu cuenta personal")
})

expressApp.listen(PORT, () => { 
    console.log(`Escuchando en el puerto ${PORT} `)
})


