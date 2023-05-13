import InterestModel from "../models/Interest.js";
import { validationResult } from "express-validator";

export const create = async (req, res) => {
  try{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(
        {
          message: 'Выберите хотя бы один интерес'
        }
      );
    }

    const doc = new InterestModel({
      interests: req.body.interests,
      user_id: req.userId
    });

    const interests = await doc.save();

    res.json({
      "interests": interests.interests
    });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось сохранить интересы"
    });
  }
};

export const getInterests = async (req, res) => {
  try {
    const interests = await InterestModel.findOne({ user_id: req.userId });

    if (!interests) {
      return res.status(404).json({
        message: 'Интересы не найдены'
      });
    }

    res.json({
      "interests": interests.interests
    });
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось получить данные'
    });
  }
};