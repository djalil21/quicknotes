const router = require("express").Router();
const noteController = require("../controllers/note.controller");
const { isLogged, isAuthor } = require("../utils/middleware");

router.route("/")
    .get(isLogged, noteController.getAll)
    .post(isLogged, noteController.createOne);

router.route("/:id")
    .get(isLogged, isAuthor, noteController.getOne)
    .put(isLogged, isAuthor, noteController.updateOne)
    .delete(isLogged, isAuthor, noteController.deleteOne);

module.exports = router;
