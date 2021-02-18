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
  getWeather: function () {
    return axios.get("/api/weather/");
  }
};
