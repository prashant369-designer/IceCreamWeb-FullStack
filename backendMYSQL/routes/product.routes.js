const express = require("express");
const {
    createpremiumice,
    getpremiumice,
    deletepremiumice,
    updatepremiumice,
    getpremiumiceById,
    searchpremiumice
} = require("../controllers/product.controllers");

const router = express.Router();

router.post("/", createpremiumice);
router.get("/", getpremiumice);
router.get("/:id", getpremiumiceById);
router.put("/:id", updatepremiumice);
router.delete("/:id", deletepremiumice);
router.get("/search/:query", searchpremiumice);


module.exports = router;
