import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  works: [
    {
      name: {
        type: String,
        required: true,
      },
      brief: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
    },
  ],
});

const Portfolio =
  mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
