const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// modul user
const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  bio: String,
  photoProfile: String,
  publicKey: { e: Number, n: Number },
  privateKey: { d: Number, n: Number },
});
const user = mongoose.model("user", userSchema);

// modul room
const roomSchema = new Schema({
  name: String,
  topic: String,
  description: String,
  type: String,
  date: String,
  users: Array,
});
const room = mongoose.model("room", roomSchema);

// modul topic

const topicSchema = new Schema({
  name: String,
  count: { type: Number, default: 0 },
});

const topic = mongoose.model("topic", topicSchema);

// modul pesan
const pesanSchema = new Schema({
  pesan: String,
  attachment: {
    name: String,
    content: [String],
  },
  key: {
    name: String,
    content: Buffer,
  },
  date: String,
  sender: String,
  roomId: String,
  isSystemMessage: {
    type: Boolean,
    default: false,
  },
});
const pesan = mongoose.model("pesan", pesanSchema);

module.exports = {
  user,
  topic,
  room,
  pesan,
};
