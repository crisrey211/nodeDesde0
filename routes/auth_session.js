import { Router } from 'express';
import { nanoid } from 'nanoid';
import { USER_BBDD } from '../bbdd.js';
import authByEmailPwd from '../helpers/check-email-password.js';

const sessions = [];
const authSessionRouter = Router();

//Login con email y password
authSessionRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Error en el servidor');
  try {
    const { guid } = authByEmailPwd(email, password);

    const sessionId = nanoid();
    sessions.push({ sessionId, guid });

    res.cookie('sessionId', sessionId, { httpOnly: true });
    return res.send();
  } catch (error) {
    return res.sendStatus(401);
  }
});

//Solicitud autenticada con token para obtener el perfil del usuario
authSessionRouter.get('/profile', (req, res) => {
  const { cookies } = req;

  if (!cookies) return res.status(401).send('Cookie no valida');
  const userSession = sessions.find(
    (session) => session.sessionId === cookies.sessionId,
  );

  if (!userSession) return req.status(401).send('Sesión usuario no encontrado');

  const user = USER_BBDD.find((user) => user.guid === userSession.guid);
  if (!user) return res.status(401);

  //Borramos la contraseña para no mandarla
  delete user.password;

  //Mandamos el objeto user de vuelta
  return res.send(user);
});

export default authSessionRouter;
