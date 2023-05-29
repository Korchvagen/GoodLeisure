import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';

import * as Validator from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import getUserPosition from "./utils/getUserPosition.js";
import * as UserController from "./controllers/UserController.js";
import * as InterestController from "./controllers/InterestController.js";
import * as LeisureController from "./controllers/LeisureController.js";
import * as FavoriteController from "./controllers/FavoriteController.js";
import * as ProfileController from "./controllers/ProfileController.js";

const app = express();
const upload = multer();
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

app.patch('/auth/edit/email', checkAuth, Validator.newEmailValidation, UserController.editEmail);

app.patch('/auth/edit/password', checkAuth, Validator.editPasswordValidation, UserController.editPassword);

app.post('/auth/delete', checkAuth, UserController.deleteAccount);

app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/interests', checkAuth, Validator.interestsCreateValidation, InterestController.createInterests);

app.get('/interests', checkAuth, InterestController.getInterests);

app.patch('/interests', checkAuth, Validator.interestsCreateValidation, InterestController.editInterests);

app.post('/leisures', checkAuth, getUserPosition, LeisureController.getLeisures);

app.post('/leisures/search', checkAuth, getUserPosition, Validator.searchValidation, LeisureController.searchLeisures);

app.get('/favorites', checkAuth, FavoriteController.getFavorites);

app.post('/favorites', checkAuth, FavoriteController.addFavoriteLeisure);

app.patch('/favorites', checkAuth, FavoriteController.removeFavoriteLeisure);

app.post('/profile', checkAuth, upload.single('image'), ProfileController.editProfile);

app.get('/profile', checkAuth, ProfileController.getProfile);

async function start(){
  try{
    await mongoose.connect(DB_URI);

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch(err){
    console.log(err);
  }
}

start();