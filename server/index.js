import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';

import { loginValidation, registerValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import { login, register, getMe, userPosition } from "./Controllers/UserControllers.js"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI;
app.use(cors());
app.use(express.json());

app.post('/auth/login', loginValidation, login);

app.post('/auth/register', registerValidation, register);

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