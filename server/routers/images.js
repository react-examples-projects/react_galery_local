const express = require("express");
const router = express.Router();
const { success, sendError } = require("../helpers/responses");
const {
  saveFilesDatabase,
  getImagesDatabase,
  deleteImageDatabase,
  editTitleImage,
  getPostById,
} = require("../controllers/images");
const { imageSchemaValidator } = require("../helpers/shemaValidators");
const validation = require("../middlewares/validationHandler");

// To validate the payload body to save in the database
router.post("/", /*validation(imageSchemaValidator),*/ async (req, res) => {
  const files = req.body["files[]"];
  try {
    const saved = await saveFilesDatabase(files);
    res.status(201);
    res.json(success(saved, 201));
  } catch (err) {
    console.log(err);
    sendError(res, "An error ocurred while creating the posts");
  }
});

router.get("/", async (req, res) => {
  try {
    const images = await getImagesDatabase();
    res.json(success(images));
  } catch (err) {
    console.log(err);
    sendError(res, "An error ocurred while querying the posts");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await deleteImageDatabase(id);
    res.json(success({ id, ...data }));
  } catch (err) {
    console.log(err);
    sendError(res, `An error ocurred while deleting the post`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title } = req.body;
    const data = await editTitleImage(id, title);
    res.json(success({ id, ...data }));
  } catch (err) {
    console.log(err);
    sendError(res, `An error ocurred while editing the post`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getPostById(id);
    res.json(success(data));
  } catch (err) {
    console.log(err);
    sendError(res, `An error ocurred while finding the post`);
  }
});

module.exports = router;
