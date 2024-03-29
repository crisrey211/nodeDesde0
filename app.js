console.clear;
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';
import authTokenRouter from './routes/auth_token.js';
import authSessionRouter from './routes/auth_session.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const expressApp = express();

//Middelware sirven para recibir el body
expressApp.use(cookieParser());
expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use('/account', accountRouter);

expressApp.use('/auth', authRouter);

expressApp.use('/auth-token', authTokenRouter);
expressApp.use('/auth-session', authSessionRouter);

expressApp.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT} `);
});
