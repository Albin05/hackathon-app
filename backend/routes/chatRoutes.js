const express = require("express");
const {
  fetchChats,
  renameGroup,
  createGroupAll,
  createGroupStudents,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, fetchChats);
router.route("/groupall").post(protect, createGroupAll);
router.route("/groupstudent").post(protect, createGroupStudents);
router.route("/rename").put(protect, renameGroup);

module.exports = router;
