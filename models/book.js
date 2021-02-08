const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  colorScheme: String,
  date: { type: Date, default: Date.now },
  lists: {id: { type: Schema.Types.ObjectId, ref: "listSchema"}}
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
