import ProfileModel from '../models/Profile.js';

export const editProfile = async (req, res) => {
  try {
    console.log(req.body.type)
    if (req.body.type && !(req.body.type === "image/png" || req.body.type === "image/jpeg")) {
      return res.status(400).json({
        message: req.headers.language === "ru" ? "Неверный формат файла. Выберите формат PNG или JPEG" : "Invalid file format. Select PNG or JPEG format"
      });
    }

    const profile = await ProfileModel.findOne({ user_id: req.userId });

    if (!profile) {
      const newProfile = await createProfile(req.userId, req.file?.buffer.toString('base64'), req.body?.name, req.body?.city);

      if (!newProfile) {
        return res.status(500).json({
          message: req.headers.language === "ru" ? "Не удалось сохранить персональные данные" : "Failed to save personal data"
        });
      }

      const updatedPprofile = {
        image: newProfile.image ? newProfile.image : "",
        name: newProfile.name,
        city: newProfile.city
      };

      return res.json({
        profile: updatedPprofile
      });
    }

    const updatedModel = await ProfileModel.findOneAndUpdate({ user_id: req.userId }, { image: req.file?.buffer.toString('base64'), name: req.body?.name, city: req.body?.city }, { new: true });

    const updatedPprofile = {
      image: updatedModel.image,
      name: updatedModel.name,
      city: updatedModel.city
    };

    res.json({
      profile: updatedPprofile
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: req.headers.language === "ru" ? "Не удалось изменить персональные данные" : "Failed to edit personal data"
    });
  }
};

const createProfile = async (user_id, file, name, city) => {
  try {
    const doc = new ProfileModel({
      image: file,
      name: name,
      city: city,
      user_id: user_id
    });

    const newProfile = await doc.save();

    return newProfile;
  } catch (err) {
    return false;
  }
}

export const getProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user_id: req.userId });

    if (!profile) {
      return res.status(404).json({
        image: "",
        name: "",
        city: ""
      });
    }

    const profileResponse = {
      image: profile.image,
      name: profile.name,
      city: profile.city
    };

    res.json({
      profile: profileResponse
    });
  } catch (err) {
    res.status(500).json({
      message: req.headers.language === "ru" ? "Не удалось получить данные" : "Failed to get data"
    });
  }
};