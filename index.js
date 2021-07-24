const express = require("express");
const cors = require("cors");
const initMongoServer = require("./backend/config/connection");
const router = require("./backend/routes/user.routes");

//inicializations
const app = express();
initMongoServer();

//middlewares
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//statics files

//routes
app.use("/api", router);
app.get("/", (req, res) => {
  res.json({ message: "API is Working" });
});

//Settings
const PORT = process.env.PORT || 3000;

//server listening
app.listen(PORT, (err) => {
  if (err) {
    console.log(`An error has occurred ${err}`);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
