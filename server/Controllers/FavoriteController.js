import FavoriteModel from '../models/Favorite.js';

export const getFavorites = async (req, res) => {
  try {
    const favorites = await FavoriteModel.findOne({ user_id: req.userId });

    if (!favorites) {
      return res.json({
        favorites: []
      });
    }

    res.json({
      favorites: favorites.favorites
    });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось добавить в Избранное"
    });
  }
};

export const addFavoriteLeisure = async (req, res) => {
  try {
    const favorites = await FavoriteModel.findOne({ user_id: req.userId });

    if (!favorites) {
      const result = await createFavorites(req.userId, req.body.favorite);

      if(!result){
        return res.status(500).json({
          message: "Не удалось добавить в Избранное"
        });
      }

      return res.json({
        favorites: result
      });
    }

    const addedFavorite = favorites.favorites;

    addedFavorite.push(Number(req.body.favorite));

    const updatedModel = await FavoriteModel.findOneAndUpdate({ user_id: req.userId }, { favorites: addedFavorite }, { new: true });

    res.json({
      favorites: updatedModel.favorites
    });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось добавить в Избранное"
    });
  }
};

const createFavorites = async (user_id, favorite) => {
  try {
    const doc = new FavoriteModel({
      favorites: [Number(favorite)],
      user_id: user_id
    });

    const { favorites } = await doc.save();

    return favorites;
  } catch (err) {
    return false;
  }
}

export const removeFavoriteLeisure = async (req, res) => {
  try{
console.log(req.body);

    const favorites = await FavoriteModel.findOne({ user_id: req.userId });
    console.log(favorites)

    const filteredFavorites = favorites.favorites.filter(elem => elem != req.body.favorite);
    console.log(filteredFavorites)

    const updatedModel = await FavoriteModel.findOneAndUpdate({ user_id: req.userId }, { favorites: filteredFavorites }, { new: true });
    console.log(updatedModel)
    res.json({
      favorites: updatedModel.favorites
    });
  } catch(err){
    return res.status(500).json({
      message: "Не удалось удалить из Избранное"
    });
  }
}