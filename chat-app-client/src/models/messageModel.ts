import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    gif: {
      type: String,
      default: "",
    },
  },
  {timestamps: true}
);

const Message =
  mongoose.models.messages || mongoose.model("messages", messageSchema);

export default Message;
