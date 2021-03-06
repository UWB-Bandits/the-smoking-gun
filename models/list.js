const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: { type: String, required: true },
  items: [{
    name: String,
    completed: Boolean
  }],
  date: { type: Date, default: Date.now },
  book: { type: Schema.Types.ObjectId, ref: "Book" },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
