import { Router } from 'express';
import authByEmailPwd from '../helpers/check-email-password.js';
import { SignJWT, jwtVerify } from 'jose';
import { USER_BBDD } from '../bbdd.js';
import validateLoginDTO from '../DTO/validate_login_dto.js';

const authTokenRouter = Router();

//Login con email y password

authTokenRouter.post('/login', validateLoginDTO, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400);

  try {
    const { guid } = authByEmailPwd(email, password);
    //GENERAR TOKEN Y DEVOLVER TOKEN
    const jwtConstructor = new SignJWT({ guid });

    const enconder = new TextEncoder();
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: 'HS256', typ: 'jwt' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(enconder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({ jwt });
  } catch (error) {
    return res.sendStatus(401);
  }
});

//Solicitud autenticada con token para obtener el perfil del usuario
authTokenRouter.get('/profile', async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);
  try {
    const enconder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization,
      enconder.encode(process.env.JWT_PRIVATE_KEY),
    ); //el segundo parámetro es la clave privada

    //OBTENER TOKEN DE CABECERA Y COMPORBAR SU AUTENTICIDAD Y CADUCIDAD
    const user = USER_BBDD.find((user) => user.guid === payload.guid);

    if (!user) return res.status(401);

    //Borramos la contraseña para no mandarla
    delete user.password;

    //Mandamos el objeto user de vuelta
    return res.send(user);
  } catch (error) {
    return res.send(401);
  }
});
export default authTokenRouter;
