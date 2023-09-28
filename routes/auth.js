import { Router } from "express";
import { USER_BBDD } from "../bbdd";

const authRouter = Router()

//Endpoint público (No autenticado y no autorizado) 
authRouter.get("publico", (req, res) => res.send("endpoint publico") )

//Endpoint autenticado para todo usuario registrado
authRouter.post("autenticado", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send("mo te has autenticado")

    const user = USER_BBDD.filter((user) => user.email === email)
    if (!user) return res.send(401).send("No autenticado")
    
    if(user.password === password ) return res.send(401).send("No autenticado") 
    
    res.send(`Usuario ${user.name} autenticado`)
})

//Endpoint autorizado a administradores
authRouter.post("autorizado", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send("mo te has autenticado")

    const user = USER_BBDD.filter((user) => user.email === email)
    if (!user) return res.send(401).send("No autenticado")
    
    if(user.password === password ) return res.send(401).send("No autenticado") 
    
    if(user.role==='admin') return res.send(403).send("No autorizado") 

    res.send(`Usuario adminstrado ${user.name}`)
})


export default authRouter