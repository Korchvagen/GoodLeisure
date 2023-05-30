import InterestModel from "../models/Interest.js";
import { validationResult } from "express-validator";

export const createInterests = async (req, res) => {
  try{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(
        {
          message: req.headers.language === "ru" ? "Выберите хотя бы один интерес" : "Please select at least one interest"
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
      message: req.headers.language === "ru" ? "Не удалось сохранить интересы" : "Failed to save interests"
    });
  }
};

export const getInterests = async (req, res) => {
  try {
    const { interests } = await InterestModel.findOne({ user_id: req.userId });
    
    if (!interests) {
      return res.status(404).json({
        message: req.headers.language === "ru" ? "Интересы не найдены" : "Interests not found"
      });
    }

    res.json({
      interests: interests
    });
  } catch (err) {
    res.status(500).json({
      message: req.headers.language === "ru" ? "Не удалось получить данные" : "Failed to get data"
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
          message: req.headers.language === "ru" ? "Выберите хотя бы один интерес" : "Please select at least one interest"
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
      message: req.headers.language === "ru" ? "Не удалось изменить интересы" : "Failed to edit interests"
    });
  }
};