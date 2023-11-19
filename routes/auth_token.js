import { Router } from 'express';
import authByEmailPwd from '../helpers/check-email-password';

const authTokenRouter = Router();

//Login con email y password

authTokenRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Error en el servidor');

  try {
    const user = authByEmailPwd(email, password);
  } catch (error) {
    return res.sendStatus(401);
  }
});

//Solicitud autenticada con token para obtener el perfil del usuario

export default authTokenRouter;
