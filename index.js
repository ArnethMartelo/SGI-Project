const express = require("express");
const cors = require("cors");
const initMongoServer = require("./backend/config/connection");
const userRoute = require("./backend/routes/user.routes");
const incidentRoute = require('./backend/routes/incident.routes')

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

app.get("/", (req, res) => {
  res.json({ message: "API is Working" });
});

app.use("/api", userRoute);
app.use("/api", incidentRoute);

// Handle 404 - Keep this as a last route
app.use((req, res, next) =>{
    res.status(404);
    res.send('404: File Not Found');
    next();
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
