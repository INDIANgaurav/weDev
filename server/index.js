require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const app = express();
app.use(express.json());
app.use(
  cors( )
);
const { connectDb } = require("./connect");
const { generateTasks } = require("./controllers/generateTask");
  
connectDb() ;
 
app.get("/" , (req , res ) => {
  res.send("Welcome weDevs")
 })
  
app.use("/api/v1/auth", authRoute);
app.use("/api/v1", generateTasks);
app.listen(5000, () => console.log("Server running on port 5000 🚀"));
