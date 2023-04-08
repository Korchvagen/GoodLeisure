import express from "express";
import mongoose from "mongoose";

import { loginValidation, registerValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import { login, register, getMe, userPosition } from "./Controllers/UserControllers.js"

mongoose
  .connect('mongodb+srv://Korchvagen:Kucher_proger228@goodleisure.eaey05a.mongodb.net/GoodLeisure?retryWrites=true&w=majority')
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB ERROR', err));

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation, login);

app.post('/auth/register', registerValidation, register);

app.get('/auth/me', checkAuth, getMe);

app.get('/position', userPosition);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('SERVER OK');
});