const router = require("express").Router();
const bookRoutes = require("./books");
const listRoutes = require("./lists");
const userRoutes = require("./users");
const weatherRoute = require("./dashboardAPI");

// Book routes
router.use("/books", bookRoutes);
// list routes
router.use("/lists", listRoutes);
// user routes
router.use("/users", userRoutes);

router.use("/weather", weatherRoute);

module.exports = router;
