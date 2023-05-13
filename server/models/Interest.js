import mongoose from "mongoose";

const InterestSchema = new mongoose.Schema(
  {
    interests: {
      type: Array
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }
);

export default mongoose.model('Interest', InterestSchema);