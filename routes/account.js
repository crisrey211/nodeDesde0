import express from "express";
import { USER_BBDD } from '../bbdd.js'

const accountRouter = express.Router()


//Obtener los detalles de la cuenta a partir de la cuenta a partir del guid
accountRouter.get('/account/:guid', (req, res) => { 
    const { guid } = req.params
    
    const user = USER_BBDD.find(user => user.guid === guid)
    console.log(guid,user);
    if(!user) res.status(400).send("erro al obtener resultados")
    return res.send(user)
})

//Crear una cuenta
accountRouter.post('/account', (req, res) => {
    const { guid, name } = req.body
    if (!guid || !name) res.status(400).send("No se ha podido crear cuenta")
    const user = USER_BBDD.find(user => user.guid === guid)
    if (user) res.status(409).send("La cuenta ya existe")

    USER_BBDD.push({
        guid, name
    })
    return res.send("se hareadfo bien")
})

//Actualizar una cuenta
accountRouter.patch('/account/:guid', (req, res) => {
    const { guid , name} = req.body
    const user = USER_BBDD.find(user => user.guid === guid)
    if (!user) res.status(400).send("No se ha podido actualizar cuenta")
    user.name = name
    return res.send(user)
})

//Eliminar una cuenta
accountRouter.delete('/account/:guid', (req, res) => {
    const { guid } = req.params
    const userIndex = USER_BBDD.findIndex(user => user.guid === guid)

    if (userIndex === -1) res.status(400).send("No se ha podido eliminar la cuenta")
    
    USER_BBDD.splice(userIndex, 1)
    return res.send()
})

export default accountRouter