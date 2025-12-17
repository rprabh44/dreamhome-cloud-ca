const express = require("express");
const path = require("path");

const app = express();
const webRoot = path.join(__dirname, "DreamHomeApp2", "www");

app.use(express.static(webRoot, { index: false }));

app.get("*", (req, res) => {
  res.sendFile(path.join(webRoot, "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`DreamHome running on port ${port}`);
});
