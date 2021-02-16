const router = require("express").Router();
const bookRoutes = require("./books");
const listRoutes = require("./lists");
const calendarRoutes = require("./calendars");
const userRoutes = require("./users");

// Book routes
router.use("/books", bookRoutes);
// list routes
router.use("/lists", listRoutes);
// calendar routes
router.use("/calendars", calendarRoutes);
// user routes
router.use("/users", userRoutes);

module.exports = router;
