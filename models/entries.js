const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  book: { type: Schema.Types.ObjectId, ref: "Book" },
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;