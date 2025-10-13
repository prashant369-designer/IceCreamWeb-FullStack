const express = require("express");
const router = express.Router();

const {
    createblog,
    getblog,
    getblogmodelbyid,
    deleteblogmodel,
    updateblogmodel

} = require("../controllers/blog.controllers");

router.post("/", createblog);
router.get("/", getblog);
router.get("/:id", getblogmodelbyid);
router.put("/:id", updateblogmodel);
router.delete("/:id", deleteblogmodel);

module.exports = router;
