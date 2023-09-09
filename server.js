import express from "express";
import env from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import employeeRoutes from "./routes/employeeRoute.js";
import cafeRoutes from "./routes/cafeRoute.js";

const app = express();
env.config();

const PORT = process.env.PORT || 8080;

// parse request to bodyParser
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// log api requests
app.use(morgan("tiny"));

// routes path
app.use("/cafes", cafeRoutes);
app.use("/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Application is running...");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))
  )
  .catch((error) => console.log(error.message));
