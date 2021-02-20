const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doodleSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, default: Date.now },
  book: { type: Schema.Types.ObjectId, ref: "Book" },
});

const Doodle = mongoose.model("Doodle", doodleSchema);

module.exports = Doodle;
