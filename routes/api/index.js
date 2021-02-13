const router = require("express").Router();
const bookRoutes = require("./books");
const listRoutes = require("./lists");
const userRoutes = require("./users");

// Book routes
router.use("/books", bookRoutes);
// list routes
router.use("/lists", listRoutes);
// user routes
router.use("/users", userRoutes);

module.exports = router;
