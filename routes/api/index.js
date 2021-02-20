const router = require("express").Router();
const bookRoutes = require("./books");
const listRoutes = require("./lists");
const calendarRoutes = require("./calendars");
const userRoutes = require("./users");
const weatherRoute = require("./dashboardAPI");
const habitRoutes = require("./habits");
const entryRoutes = require("./entries");

// Book routes
router.use("/books", bookRoutes);
// list routes
router.use("/lists", listRoutes);
// calendar routes
router.use("/calendars", calendarRoutes);
// user routes
router.use("/users", userRoutes);

router.use("/weather", weatherRoute);
router.use("/habits", habitRoutes);

router.use("/entries", entryRoutes);

module.exports = router;
