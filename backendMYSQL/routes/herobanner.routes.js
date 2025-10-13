const express = require("express");
const {
    createHerobanner,
    getHerobanners,
    getHerobannerById,
    updateHerobanner,
    deleteHerobanner
} = require("../controllers/herobanner.controllers");

const router = express.Router();

router.post("/", createHerobanner);
router.get("/", getHerobanners);
router.get("/:id", getHerobannerById);
router.put("/:id", updateHerobanner);
router.delete("/:id", deleteHerobanner);

module.exports = router;
