require("./connection");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { PORT } = require("./config/config");
const { success } = require("./helpers/responses");
const imagesRouters = require("./routers/images");

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(__dirname + "/uploads"));

// routes
app.use("/api/posts", imagesRouters);

app.get("/", (req, res) => {
  res.json(success("Index route is empty"));
});

app.listen(PORT, () => {
  console.log(`The server started on PORT: ${PORT}`);
});
