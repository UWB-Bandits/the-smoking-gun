const router = require("express").Router();
const doodleController = require("../../controllers/doodleController");

// Matches with "/api/doodle"
router.route("/").get(doodleController.findAll).post(doodleController.create);

// Matches with "/api/doodle/:id"
router
  .route("/:id")
  .get(doodleController.findById)
  .put(doodleController.update)
  .delete(doodleController.remove);

module.exports = router;
