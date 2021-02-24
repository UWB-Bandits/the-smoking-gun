const router = require("express").Router();
const entriesController = require("../../controllers/entriesController");

// Matches with "/api/entries"
router.route("/").get(entriesController.findAll).post(entriesController.create);
router.route("/findWhere/:id").get(entriesController.findWhere);
// Matches with "/api/entries/:id"
router
  .route("/:id")
  .get(entriesController.findById)
  .put(entriesController.update)
  .delete(entriesController.remove);

module.exports = router;