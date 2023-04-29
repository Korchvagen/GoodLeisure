import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import IpBase from "@everapi/ipbase-js";

import { validationResult } from "express-validator";

import UserModel from "../models/User.js";

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(
        {
          message: 'Неверный логин или пароль'
        }
      );
    }

    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Неверный логин или пароль'
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль'
      });
    }

    const token = jwt.sign(
      {
        _id: user._id
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '30d'
      }
    );

    const { password, ...userData } = user._doc;

    res.json({
      ...userData,
      token
    });
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось авторизоваться'
    });
  }
}

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    const reqPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqPassword, salt);

    const newUser = new UserModel({
      email: req.body.email,
      password: hashedPassword
    });

    const user = await newUser.save();

    const token = jwt.sign(
      {
        _id: user._id
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '30d'
      }
    );

    const { password, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
      message: 'Вы зарегались'
    });
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось зарегистрироваться'
    });
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден'
      });
    }

    const { password, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось получить данные'
    });
  }
}

export const userPosition = async (req, res) => {
  const ipBase = new IpBase('bVWKaXAJzvtZfQptajsDqaMB63iGqKNdTjBqkWMt');
  const ip = req.ip;

  ipBase.info({
    ip: '37.215.62.128',
    language: 'ru'
  }).then(response => {
    console.log(response.data.location.city);
  });
}