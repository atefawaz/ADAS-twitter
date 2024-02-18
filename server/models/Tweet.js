import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    filename: String,
    contentType: String,
    data: Buffer,
    url: String, // Added for storing image URLs
  },
  { _id: false }
);

const TweetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      max: 280,
    },
    likes: {
      type: Array,
      defaultValue: [],
    },
    media: [MediaSchema], // Array of media objects
  },
  { timestamps: true }
);

export default mongoose.model("Tweet", TweetSchema);
