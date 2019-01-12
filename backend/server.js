const express = require("express");
const cors = require("cors");
const routes = require("./api/routes");
const app = express();

const LISTEN_PORT = process.env.PORT || 3001;

const DEBUG = true;
app.use(cors());

app.use((req, res, next) => {
  DEBUG && console.log("request path", req.path);
  next();
});

app.use("/api", routes);

app.use("/static", express.static(__dirname + "/static"));

app.get("/", (req, res) => res.send("MusicLibrary server ready"));

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ message: err.message });
});

app.listen(LISTEN_PORT, function() {
  console.log(`Server ready at port ${LISTEN_PORT}!`);
});
