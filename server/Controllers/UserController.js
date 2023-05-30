import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { validationResult } from "express-validator";

import UserModel from "../models/User.js";
import { sendConfirmationCode } from "../utils/sendCode.js";

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(
        {
          message: req.headers.language === "ru" ? "Неверный логин или пароль" : "Wrong login or password"
        }
      );
    }

    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: req.headers.language === "ru" ? "Неверный логин или пароль" : "Wrong login or password"
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

    if (!isValidPass) {
      return res.status(400).json({
        message: req.headers.language === "ru" ? "Неверный логин или пароль" : "Wrong login or password"
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
      message: req.headers.language === "ru" ? "Не удалось авторизоваться" : "Failed to login"
    });
  }
}

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    const isLoginExist = await UserModel.findOne({ email: req.body.email });

    if(isLoginExist){
      return res.status(400).json({
        message: req.headers.language === "ru" ? "Пользователь уже зарегистрирован" : "User already registered"
      });
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
      token
    });
  } catch (err) {
    res.status(500).json({
      message: req.headers.language === "ru" ? "Не удалось зарегистрироваться" : "Failed to register"
    });
  }
}

export const sendCode = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(
        {
          success: false,
          message: req.headers.language === "ru" ? "Неверный логин" : "Invalid login"
        }
      );
    }

    const user = await UserModel.findOne({ email: req.body.recoveryEmail });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: req.headers.language === "ru" ? "Неверный логин" : "Invalid login"
      });
    }

    const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const result = sendConfirmationCode(req.body.recoveryEmail, code);
    
    if(!result){
      return res.status(400).json({
        success: result,
        message: req.headers.language === "ru" ? "Не удалось отправить письмо" : "failed to send mail"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedCode = await bcrypt.hash(code.toString(), salt);

    res.json({
      success: result,
      code: hashedCode,
      email: req.body.recoveryEmail
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: req.headers.language === "ru" ? "Не удалось отправить письмо" : "failed to send mail"
    });
  }
}

export const checkCode = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(
        {
          success: false,
          message: req.headers.language === "ru" ? "Неверный код" : "Incorrect code"
        }
      );
    }

    const isValidCode = await bcrypt.compare(req.body.code, req.body.stateCode);

    if (!isValidCode) {
      return res.status(400).json({
        success: false,
        message: req.headers.language === "ru" ? "Неверный код" : "Incorrect code"
      });
    }

    res.json({
      success: true
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: req.headers.language === "ru" ? "Не удалось проверить код" : "Failed to verify code"
    });
  }
}

export const newPassword = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    const user = await UserModel.findOne( { email: req.body.email });

    if(!user){
      return res.status(404).json({
        success: false,
        message: req.headers.language === "ru" ? "Пользователь не найден" : "User is not found"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);

    await UserModel.updateOne({ _id: user._id }, { password: hashedNewPassword });

    res.json({
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: req.headers.language === "ru" ? "Не удалось изменить пароль" : "Failed to efit password"
    });
  }
}

export const editEmail = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.errors[0].msg
      });
    }

    const user = await UserModel.findOne( { _id: req.userId });

    if(!user){
      return res.status(404).json({
        message: req.headers.language === "ru" ? "Пользователь не найден" : "User is not found"
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

    if (!isValidPass) {
      return res.status(400).json({
        message: req.headers.language === "ru" ? "Неверный пароль" : "Incorrect password"
      });
    }

    const updatedUser = await UserModel.findOneAndUpdate({ _id: user._id }, { email: req.body.email }, { new: true });

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: req.headers.language === "ru" ? "Не удалось изменить электронную почту" : "Failed to edit email"
    });
  }
};

export const editPassword = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    const user = await UserModel.findOne( { _id: req.userId });

    if(!user){
      return res.status(404).json({
        message: req.headers.language === "ru" ? "Пользователь не найден" : "User is not found"
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

    if (!isValidPass) {
      return res.status(400).json({
        message: req.headers.language === "ru" ? "Неверный пароль" : "Incorrect password"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);

    const updatedUser = await UserModel.findOneAndUpdate({ _id: user._id }, { password: hashedNewPassword }, { new: true });

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: req.headers.language === "ru" ? "Не удалось изменить пароль" : "Failed to efit password"
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const user = await UserModel.findOne( { _id: req.userId });

    if(!user){
      return res.status(404).json({
        message: req.headers.language === "ru" ? "Пользователь не найден" : "User is not found"
      });
    }
    
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

    if (!isValidPass) {
      return res.status(400).json({
        message: req.headers.language === "ru" ? "Неверный пароль" : "Incorrect password"
      });
    }

    await UserModel.deleteOne({ _id: user._id });

    res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: req.headers.language === "ru" ? "Не удалось удалить учетную запись" : "Failed to delete account"
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        message: req.headers.language === "ru" ? "Пользователь не найден" : "User is not found"
      });
    }

    const { password, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    res.status(500).json({
      message: req.headers.language === "ru" ? "Не удалось получить данные" : "Failed to get data"
    });
  }
}