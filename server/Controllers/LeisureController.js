import InterestModel from "../models/Interest.js";

export const getProposedLeisures = async (req, res) => {
  try {
    const { interests } = await InterestModel.findOne({ user_id: req.userId });
    
    const responses = await Promise.all(interests.map(interest => fetch(`https://search-maps.yandex.ru/v1/?text=Минск,${interest}&type=biz&lang=ru_RU&apikey=${process.env.API_KEY}`)));
    const data = await Promise.all(responses.map(response => response.json()));

    res.json({
      leisures: data
    });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить данные"
    });
  }
};