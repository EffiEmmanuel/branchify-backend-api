import mongoose from "mongoose";

const linkSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
    },
    branch: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const LinkModel = new mongoose.model("Link", linkSchema);
export default LinkModel;
