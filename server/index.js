import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';

import * as Validator from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./Controllers/UserController.js";
import * as InterestController from "./Controllers/InterestController.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI;
app.use(cors());
app.use(express.json());

app.post('/auth/login', Validator.loginValidation, UserController.login);

app.post('/auth/register', Validator.registerValidation, UserController.register);

app.post('/auth/recovery/email', Validator.emailValidation, UserController.sendCode);

app.post('/auth/recovery/code', Validator.codeValidation, UserController.checkCode);

app.patch('/auth/recovery/password', Validator.newPasswordValidation, UserController.newPassword);

app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/position', UserController.userPosition);

app.post('/interests', checkAuth, Validator.interestsCreateValidation, InterestController.create)

app.get('/interests', checkAuth, InterestController.getInterests)

async function start(){
  try{
    await mongoose.connect(DB_URI);

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch(err){
    console.log(err);
  }
}

start();