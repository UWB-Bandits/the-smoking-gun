const router = require("express").Router();
const calendarsController = require("../../controllers/calendarsController");

// Matches with "/api/calendars"
router.route("/").get(calendarsController.findAll).post(calendarsController.create);

// Matches with "/api/calendars/:id"
router
  .route("/:id")
  .get(calendarsController.findById)
  .put(calendarsController.update)
  .delete(calendarsController.remove);

module.exports = router;
