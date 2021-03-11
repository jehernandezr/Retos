var express = require('express');
var router = express.Router();
const chatController= require('../controllers/chatController');

router.route("/").get(chatController.getAllMessages);

router.route("/").post(chatController.createMessage);
router
  .route("/:ts")
  .get(chatController.getMessage)
  .put(chatController.updateMessage)
  .delete(chatController.deleteMessage);
module.exports = router;

