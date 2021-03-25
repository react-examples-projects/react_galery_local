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
} = require("./controllers/images");

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(__dirname + "/uploads"));

// routes
app.get("/", (req, res) => {
  res.json({
    data: "Index route empty",
  });
});

app.post("/post", async (req, res) => {
  const files = req.files.files;
  const saved = await saveFilesDatabase(files);
  res.json(saved);
});

app.get("/posts", async (req, res) => {
  const images = await getImagesDatabase();
  res.json(images);
});

app.delete("/post/:id", async (req, res) => {
  const id = req.params.id;
  const data = await deleteImageDatabase(id);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`The server started on PORT: ${PORT}`);
});
