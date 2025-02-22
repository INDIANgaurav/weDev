require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const { connectDb } = require("./connect");
const { generateTasks } = require("./controllers/generateTask");

const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = [
  "https://we-dev-three.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.options("*", cors());  

connectDb();

app.get("/", (req, res) => {
  res.send("Welcome to weDevs");
});

app.use("/api/v1/auth", authRoute);   
app.use("/api/v1", generateTasks);    

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
