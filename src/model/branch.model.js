import mongoose from "mongoose";

const branchSchema = mongoose.Schema(
  {
    branchName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
    },
    links: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

const BranchModel = new mongoose.model("Branch", branchSchema);
export default BranchModel;
