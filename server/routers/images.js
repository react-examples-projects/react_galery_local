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

router.post("/", async (req, res) => {
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
  const id = req.params.id;
  try {
    const data = await deleteImageDatabase(id);
    res.json(success({ id, ...data }));
  } catch (err) {
    console.log(err);
    sendError(res, `An error ocurred while deleting the ${id} post`);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { title } = req.body;
    const data = await editTitleImage(id, title);
    res.json(success({ id, ...data }));
  } catch (err) {
    console.log(err);
    sendError(res, `An error ocurred while editing the ${id} post`);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await getPostById(id);
    res.json(success(data));
  } catch (err) {
    console.log(err);
    sendError(res, `An error ocurred while finding the ${id} post`);
  }
});

module.exports = router;
