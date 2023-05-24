import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    image: {
      type: String
    },
    name: {
      type: String
    },
    city: {
      type: String
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }
);

export default mongoose.model('Profile', ProfileSchema);