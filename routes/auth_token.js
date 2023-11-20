import { Router } from 'express';
import authByEmailPwd from '../helpers/check-email-password.js';
import { SignJWT } from 'jose';
import { USER_BBDD } from '../bbdd.js';

const authTokenRouter = Router();

//Login con email y password

authSessionRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400);

  try {
    const user = authByEmailPwd(email, password);
    //GENERAR TOKEN Y DEVOLVER TOKEN

    return res.send(`Usuario ${user.name} autenticado`);
  } catch (error) {
    return res.sendStatus(401);
  }
});

//Solicitud autenticada con token para obtener el perfil del usuario
authSessionRouter.get('/profile', (req, res) => {
  //OBTENER TOKEN DE CABECERA Y COMPORBAR SU AUTENTICIDAD Y CADUCIDAD

  const user = USER_BBDD.find((user) => user.guid === userSession.guid);

  if (!user) return res.status(401);

  //Borramos la contraseña para no mandarla
  delete user.password;

  //Mandamos el objeto user de vuelta
  return res.send(user);
});
export default authTokenRouter;
