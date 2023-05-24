import InterestModel from "../models/Interest.js";

export const getLeisures = async (req, res) => {
  try {
    const responses = await Promise.all(req.body.interests.map(interest => fetch(`https://search-maps.yandex.ru/v1/?text=Минск,${interest}&type=biz&lang=ru_RU&apikey=${process.env.API_KEY}`)));
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

export const getFavoriteLeisures = async (req, res) => {
  try {
    const responses = await Promise.all(req.body.favorites.map(favorite => fetch(`https://search-maps.yandex.ru/v1/?text=Минск,${favorite}&type=biz&lang=ru_RU&apikey=${process.env.API_KEY}`)));
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