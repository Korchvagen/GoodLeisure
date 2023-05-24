import InterestModel from "../models/Interest.js";
import { validationResult } from "express-validator";

export const createInterests = async (req, res) => {
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

    const { interests } = await doc.save();

    res.json({
      interests: interests
    });
  } catch(err) {
    res.status(500).json({
      message: "Не удалось сохранить интересы"
    });
  }
};

export const getInterests = async (req, res) => {
  try {
    const { interests } = await InterestModel.findOne({ user_id: req.userId });
    
    if (!interests) {
      return res.status(404).json({
        message: 'Интересы не найдены'
      });
    }

    res.json({
      interests: interests
    });
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось получить данные'
    });
  }
};

export const editInterests = async (req, res) => {
  try{
    const errors = validationResult(req);

    const { interests } = await InterestModel.findOne({ user_id: req.userId });

    if (!errors.isEmpty()) {
      return res.status(400).json(
        {
          interests: interests,
          message: 'Выберите хотя бы один интерес'
        }
      );
    }

    const updatedInterests = await InterestModel.findOneAndUpdate({ user_id: req.userId }, { interests: req.body.interests }, { new: true });

    res.json({
      interests: updatedInterests.interests
    });
  } catch(err) {
    const { interests } = await InterestModel.findOne({ user_id: req.userId });

    res.status(500).json({
      interests: interests,
      message: "Не удалось изменить интересы"
    });
  }
};