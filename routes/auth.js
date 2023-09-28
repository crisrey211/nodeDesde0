import { Router } from 'express';
import { USER_BBDD } from '../bbdd.js';
import authByEmailPwd from '../helpers/check-email-password.js';

const authRouter = Router();

//Endpoint público (No autenticado y no autorizado)
authRouter.get('/publico', (req, res) => res.send('endpoint publico'));

//Endpoint autenticado para todo usuario registrado
authRouter.post('/autenticado', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('mo te has autenticado');

  try {
    const user = authByEmailPwd(email, password);
    res.send(`Usuario ${user.name} autenticado`);
  } catch (erro) {
    return res.send(401);
  }
});

//Endpoint autorizado a administradores
authRouter.post('/autorizado', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send('No te has autenticado');

  try {
    const user = authByEmailPwd(email, password);
    if (user.role !== 'admin') return res.send(403).send('No autorizado');
    res.send(`Usuario adminstrado ${user.name}`);
  } catch (erro) {
    return res.sendStatus(401).send('Erro en la autoriazación');
  }
});

export default authRouter;
