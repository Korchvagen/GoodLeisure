import { validationResult } from "express-validator";

export const getLeisures = async (req, res) => {
  try {
    let interests = req.body.interests;

    if (interests && interests.includes('Ночная жизнь')) {
      interests = interests.map(interest => {
        if (interest === 'Ночная жизнь') {
          return 'Бар, паб, ночной клуб';
        }

        return interest;
      });
    }

    const lang = req.body.lang === "ru" ? "ru_RU" : "en_US";

    const responses = await Promise.all(interests.map(interest => fetch(`https://search-maps.yandex.ru/v1/?text=${req.Position},${interest}&results=50&type=biz&lang=${lang}&apikey=${process.env.API_KEY_ORG}`)));
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

    const lang = req.body.lang === "ru" ? "ru_RU" : "en_US";

    const response = await fetch(`https://search-maps.yandex.ru/v1/?text=${req.Position},${req.body.searchRequest}&results=50&type=biz&lang=${lang}&apikey=${process.env.API_KEY_ORG}`);
    const data = await response.json();

    res.json({
      leisures: data.features
    });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить данные"
    });
  }
};