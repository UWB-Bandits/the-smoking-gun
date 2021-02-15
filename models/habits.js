const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  name: { type: String, required: true },
  tracking: [{
    day: Date,
    completed: Boolean
  }],
  date: { type: Date, default: Date.now },
  book: { type: Schema.Types.ObjectId, ref: "Book" },
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
