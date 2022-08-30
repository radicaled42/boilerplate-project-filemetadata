var express = require("express");
var cors = require("cors");
require("dotenv").config();

// Use multer for file handling
const multer = require("multer");

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(multer().single("upfile"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", function (req, res) {
  const filename = req.file.originalname;
  const mimetype = req.file.mimetype;
  const size = req.file.size;

  // console.log(req.file);
  console.log(
    `File Upload Info - Filename: ${filename} - mimetype: ${mimetype} - size: ${size}`
  );

  res.json({
    name: filename,
    type: mimetype,
    size: size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
