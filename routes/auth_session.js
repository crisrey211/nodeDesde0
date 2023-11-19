import { Router } from 'express';
import { nanoid } from 'nanoid';
import authByEmailPwd from '../helpers/check-email-password.js';

const sessions = [];
const authSessionRouter = Router();

//Login con email y password
authSessionRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Error en el servidor');
  try {
    const user = authByEmailPwd(email, password);

    authByEmailPwd(email, password);

    const sessionId = nanoid();
    sessions.push({ sessionId });

    res.cookie('sessionId', sessionId, { httpOnly: true });
    return res.send();
  } catch (error) {
    return res.sendStatus(401);
  }
});

//Solicitud autenticada con token para obtener el perfil del usuario
authSessionRouter.get('/profile', (req, res) => {
  console.log(req.cookies);
  return res.send();
});

export default authSessionRouter;
