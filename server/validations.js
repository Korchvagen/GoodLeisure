import { body } from "express-validator";

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть не менее 8 символов').isLength({ min: 8})
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть не менее 8 символов').isLength({ min: 8}),
  body('confirmPassword', '').custom((value, { req }) => {
    if(value !== req.body.password){
      throw new Error('Пароли не совпадают');
    }

    return true;
  })
];

export const emailValidation = [
  body('recoveryEmail', 'Неверный формат почты').isEmail()
];

export const codeValidation = [
  body('code', 'Неверный формат кода').isLength({ min: 6, max: 6})
];

export const newPasswordValidation = [
  body('newPassword', 'Пароль должен быть не менее 8 символов').isLength({ min: 8}),
  body('confirmNewPassword', '').custom((value, { req }) => {
    if(value !== req.body.newPassword){
      throw new Error('Пароли не совпадают');
    }

    return true;
  })
];

export const interestsCreateValidation = [
  body('interests', 'Неверный формат интересов').isLength({ min: 1 }).isArray()
]

export const searchValidation = [
  body('searchRequest', 'Неверный формат запроса').isLength({ min: 1 })
];

export const newEmailValidation = [
  body('email', 'Неверный формат почты').isEmail()
]

export const editPasswordValidation = [
  body('newPassword', 'Пароль должен быть не менее 8 символов').isLength({ min: 8}),
  body('confirmNewPassword', '').custom((value, { req }) => {
    if(value !== req.body.newPassword){
      throw new Error('Пароли не совпадают');
    }

    return true;
  })
]