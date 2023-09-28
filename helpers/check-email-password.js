import { USER_BBDD } from '../bbdd.js';

const authByEmailPwd = (email, password) => {
  const user = USER_BBDD.find((user) => user.email === email);
  if (!user) throw new Error();

  if (user.password !== password) return res.send(401).send('No autenticado');

  return user;
};

export default authByEmailPwd;
