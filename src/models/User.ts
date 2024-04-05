import mongoose from "mongoose";

/**
 * User schema definition.
 *
 * Defines the schema for User documents in MongoDB.
 * Includes username, clerk_id, bio, and portfolios fields.
 * clerk_id must be unique.
 */
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

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
