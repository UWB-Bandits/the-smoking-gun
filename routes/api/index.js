const router = require("express").Router();
const bookRoutes = require("./books");
const listRoutes = require("./lists");

// Book routes
router.use("/books", bookRoutes);
router.use("/lists", listRoutes);

module.exports = router;
