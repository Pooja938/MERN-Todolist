import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); 


console.log("Mongo URL from .env:", process.env.MONGO_URL);  // 👈 Add this line // <-- make sure this line is here and at the top


const app = express();
app.use(cors());
app.use(express.json());
import taskRoutes from "./routes/taskRoutes.js";
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;  // <-- must match key in .env

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    const port = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log("❌ MongoDB connection error:", error));