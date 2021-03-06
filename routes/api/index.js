const router = require("express").Router();
const bookRoutes = require("./books");
const listRoutes = require("./lists");
const calendarRoutes = require("./calendars");
const userRoutes = require("./users");
const weatherRoute = require("./dashboardAPI");
const newsRoute = require("./dashboardAPI");
const habitRoutes = require("./habits");
const doodleRoutes = require("./doodle");
const entryRoutes = require("./entries");

// Book routes
router.use("/books", bookRoutes);
// list routes
router.use("/lists", listRoutes);
// calendar routes
router.use("/calendars", calendarRoutes);
// user routes
router.use("/users", userRoutes);
// weatherapi route
router.use("/weather", weatherRoute);
// newsapi route
router.use("/news", newsRoute);
// habit tracker routes
router.use("/habits", habitRoutes);
// journal routes
router.use("/entries", entryRoutes);

// doodle routes
router.use("/doodle", doodleRoutes);

module.exports = router;
