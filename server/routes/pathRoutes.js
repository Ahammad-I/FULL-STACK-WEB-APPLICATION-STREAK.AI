const express = require("express");
const { findPath } = require("../controllers/pathController");

const router = express.Router();

// Route to find the path between two points
router.post("/find-path", findPath);

module.exports = router;
