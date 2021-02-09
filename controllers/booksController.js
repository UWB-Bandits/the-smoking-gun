const db = require("../models");

// phonesRouter.post("/", (req, res) => {
//   const auth = req.currentUser;
//   if (auth) {
//     console.log("authenticated!", auth);
//     return res.send("Hi, from within the phones router POST");
//   }
//   return res.status(403).send("Not authorized");
// });

// Defining methods for the booksController
module.exports = {
  test: (req, res) => {
    const auth = req.currentUser;
    if (auth) {
      console.log("authenticated!", auth);
      db.Book.find(req.query)
        .populate("List")
        .sort({ date: -1 })
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));

      // return res.send("Hi, from within the phones router POST");
    }
    return res.status(403).send("Not authorized");
  },
  findAll: function (req, res) {
    db.Book.find(req.query)
      .populate("List")
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Book.populate("List")
      .findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Book.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Book.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Book.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
