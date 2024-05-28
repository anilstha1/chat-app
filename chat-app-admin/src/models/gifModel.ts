import mongoose from "mongoose";

const gifSchema = new mongoose.Schema(
  {
    name: {type: "string", required: true},
    url: {type: "string", required: true},
  },
  {
    timestamps: true,
  }
);

const Gif = mongoose.models.gifs || mongoose.model("gifs", gifSchema);

export default Gif;
