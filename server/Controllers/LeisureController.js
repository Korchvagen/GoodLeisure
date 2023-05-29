import { validationResult } from "express-validator";
import InterestModel from "../models/Interest.js";

export const getLeisures = async (req, res) => {
  try {
    const position = req.body.city === "" ? req.Position : req.body.city;
    let interests = req.body.interests;
    if (interests && interests.includes('Ночная жизнь')) {
      interests = interests.map(interest => {
        if (interest === 'Ночная жизнь') {
          return 'Бар, паб, ночной клуб';
        }

        return interest;
      });
    }

    const responses = await Promise.all(interests.map(interest => fetch(`https://search-maps.yandex.ru/v1/?text=${position},${interest}&results=50&type=biz&lang=ru_RU&apikey=${process.env.API_KEY_ORG}`)));
    const data = await Promise.all(responses.map(response => response.json()));

    res.json({
      leisures: data
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Не удалось получить данные"
    });
  }
};

export const searchLeisures = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(
        {
          message: 'Неверный формат запроса'
        }
      );
    }
    const position = req.body.city === "" ? req.Position : req.body.city;
    console.log(position);
    const response = await fetch(`https://search-maps.yandex.ru/v1/?text=${position},${req.body.searchRequest}&results=50&type=biz&lang=ru_RU&apikey=${process.env.API_KEY_ORG}`);
    const data = await response.json();

    res.json({
      leisures: data.features
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Не удалось получить данные"
    });
  }
};