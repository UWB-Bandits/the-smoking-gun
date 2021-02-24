const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  name: { type: String, required: true },
  events: [{
    title: String,
    start: String,
    end: String
  }],
  date: { type: Date, default: Date.now },
  book: { type: Schema.Types.ObjectId, ref: "Book" },
});

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;
