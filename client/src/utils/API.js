import axios from "axios";

export default {
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books/");
    // return axios.get("/api/books" + user_id);
  },
  getBooksWhere: function (user) {
    return axios.get("/api/books/findWhere/" + user);
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
  updateBook: function (id, bookData) {
    return axios.put("/api/books/" + id, bookData);
  },
  getLists: function () {
    return axios.get("/api/lists");
  },
  // Gets the list with the given id
  getList: function (id) {
    return axios.get("/api/lists/" + id);
  },
  // Deletes the list with the given id
  deleteList: function (id) {
    return axios.delete("/api/lists/" + id);
  },
  // Saves a list to the database
  saveList: function (listData) {
    return axios.post("/api/lists", listData);
  },
  updateList: function (id, listData) {
    return axios.put("/api/lists/" + id, listData);
  },
  createUser: function (obj) {
    return axios.post("/api/users", obj);
  },
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  // Makes call to weather api with user's location
  postWeather: function (query) {
    return axios.post("/api/weather/", query);
  },
  getCalendars: function () {
    return axios.get("/api/calendars");
  },
  // Gets the calendar with the given id
  getCalendar: function (id) {
    return axios.get("/api/calendars/" + id);
  },
  // Deletes the calendar with the given id
  deleteCalendar: function (id) {
    return axios.delete("/api/calendars/" + id);
  },
  // Saves a calendar to the database
  saveCalendar: function (calendarData) {
    return axios.post("/api/calendars", calendarData);
  },
  updateCalendar: function (id, calendarData) {
    return axios.put("/api/calendars/" + id, calendarData);
  },
  createHabit: function (obj) {
    return axios.post("/api/habits/", obj);
  },
  getHabits: function (book) {
    return axios.get("/api/habits/" + book);
  },
  updateHabit: function (id, habitData) {
    return axios.put("/api/habits/" + id, habitData);
  },
  deleteHabit: function (id) {
    return axios.delete("/api/habits/" + id);
  },
  updateUser: function (id, obj) {
    return axios.put("api/users/" + id, obj);
  },
  getEntries: function () {
    return axios.get("/api/entries/");
    // return axios.get("/api/entries" + user_id);
  },
  getEntriesWhere: function (user) {
    return axios.get("/api/entries/findWhere/" + user);
  },
  // Gets the book with the given id
  getEntry: function (id) {
    return axios.get("/api/entries/" + id);
  },
  // Deletes the book with the given id
  deleteEntry: function (id) {
    return axios.delete("/api/entries/" + id);
  },
  // Saves a book to the database
  saveEntry: function (entryData) {
    return axios.post("/api/entries", entryData);
  },
  updateEntry: function (id, entryData) {
    return axios.put("/api/entries/" + id, entryData);
  },
};
