import ProfileModel from '../models/Profile.js';

export const editProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user_id: req.userId });

    if(!profile){
      const newProfile = await createProfile(req.userId, req.file.buffer.toString('base64'), req.body.name, req.body.city);

      if(!newProfile){
        return res.status(500).json({
          message: "Не удалось сохранить персональные данные"
        });
      }

      return res.json({
        image: newProfile.image,
        name: newProfile.name,
        city: newProfile.city
      });
    }

    const updatedModel = await ProfileModel.findOneAndUpdate({ user_id: req.userId }, { image: req.file.buffer.toString('base64'), name: req.body.name, city: req.body.city }, { new: true });

    res.json({
      image: updatedModel.image,
      name: updatedModel.name,
      city: updatedModel.city
    });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось изменить персональные данные"
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

    if(!profile){
      return res.status(404).json({
        message: 'Персональные данные не найдены'
      });
    }

    res.json({
      image: profile.image,
      name: profile.name,
      city: profile.city
    });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить данные"
    });
  }
};