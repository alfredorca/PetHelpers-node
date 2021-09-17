const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

const app = express();

//environment variables
require("dotenv").config();

//database connections
mongoose
  .connect(process.env.MONGODB_URL )
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Error conecting to MONGO"));

//set up middlewares
app.use(cors({
  origin: process.env.FRONTEND_POINT,
  credentials: true
}
)); //CROSS ORIGIN RESOURCE SHARING
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

//routes
app.use("/api/providers", require("./routes/provider"));
app.use("/api/pets", require("./routes/pet"));
app.use("/api/species", require("./routes/species"));
app.use("/api/services", require("./routes/service"));
app.use("/api/offers", require("./routes/offer"));
app.use("/api/auth", require("./routes/authentication.js"));

//listen to server in a prot
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running...");
});
