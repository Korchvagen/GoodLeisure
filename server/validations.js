import { body } from "express-validator";

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть не менее 8 символов').isLength({ min: 8})
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть не менее 8 символов').isLength({ min: 8})
];

export const emailValidation = [
  body('email', 'Неверный формат почты').isEmail()
];

export const codeValidation = [
  body('code', 'Неверный формат кода').isLength({ min: 6, max: 6})
];

export const newPasswordValidation = [
  body('newPassword', 'Пароль должен быть не менее 8 символов').isLength({ min: 8}),
  body('confirmNewPssword', '').custom((value, { req }) => {
    if(value !== req.body.newPassword){
      throw new Error('Пароли не совпадают');
    }

    return true;
  })
];