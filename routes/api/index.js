const router = require("express").Router();
const bookRoutes = require("./books");
const listRoutes = require("./lists");
const userRoutes = require("./users");
const habitRoutes = require("./habits");

// Book routes
router.use("/books", bookRoutes);
// list routes
router.use("/lists", listRoutes);
// user routes
router.use("/users", userRoutes);

router.use("/habits", habitRoutes);

module.exports = router;
