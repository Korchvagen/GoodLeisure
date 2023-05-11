import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';

import { loginValidation, registerValidation, emailValidation, codeValidation, newPasswordValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import { login, register, sendCode, checkCode, newPassword, getMe, userPosition } from "./Controllers/UserControllers.js"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI;
app.use(cors());
app.use(express.json());

app.post('/auth/login', loginValidation, login);

app.post('/auth/register', registerValidation, register);

app.post('/auth/recovery/email', emailValidation, sendCode);

app.post('/auth/recovery/code', codeValidation, checkCode);

app.patch('/auth/recovery/password', newPasswordValidation, newPassword);

app.get('/auth/me', checkAuth, getMe);

app.get('/position', userPosition);

async function start(){
  try{
    await mongoose.connect(DB_URI);

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch(err){
    console.log(err);
  }
}

start();