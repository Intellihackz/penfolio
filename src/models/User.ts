import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  clerk_id: string;
  bio: string;
  portfolios: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  clerk_id: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    required: true,
  },
  portfolios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
    },
  ],
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
