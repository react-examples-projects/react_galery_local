require("./connection");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { PORT } = require("./config/config");
const {
  saveFilesDatabase,
  getImagesDatabase,
  deleteImageDatabase,
  editTitleImage,
  getPostById,
} = require("./controllers/images");
const { success, error, sendError } = require("./helpers/responses");

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(__dirname + "/uploads"));

// routes
app.get("/", (req, res) => {
  res.json(success("Index route is empty"));
});

app.post("/post", async (req, res) => {
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

app.get("/posts", async (req, res) => {
  try {
    const images = await getImagesDatabase();
    res.json(success(images));
  } catch (err) {
    console.log(err);
    sendError(res, "An error ocurred while querying the posts");
  }
});

app.delete("/post/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await deleteImageDatabase(id);
    res.json(success({ id, ...data }));
  } catch (err) {
    console.log(err);
    sendError(res, `An error ocurred while deleting the ${id} post`);
  }
});

app.put("/post/:id", async (req, res) => {
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

app.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await getPostById(id);
    res.json(success(data));
  } catch (err) {
    console.log(err);
    sendError(res, `An error ocurred while finding the ${id} post`);
  }
});

app.listen(PORT, () => {
  console.log(`The server started on PORT: ${PORT}`);
});
