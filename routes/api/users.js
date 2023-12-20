const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyroles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyroles(ROLES_LIST.Admin), usersController.getAllusers)

  .delete(verifyroles(ROLES_LIST.Admin), usersController.DeleteUsers);

router
  .route("/:id")
  .get(verifyroles(ROLES_LIST.Admin), usersController.GetUsers);

module.exports = router;
