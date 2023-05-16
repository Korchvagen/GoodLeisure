import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
  {
    favorites: {
      type: Array
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }
);

export default mongoose.model('Favorite', FavoriteSchema);