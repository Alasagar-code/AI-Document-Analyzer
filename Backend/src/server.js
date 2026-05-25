import 'dotenv/config';
import cors from "cors";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 8000;

// Check MongoDB URI
if (!process.env.MONGO_URI) {
  console.error(" Missing MONGO_URI in .env");
  process.exit(1);
}

// Connect DB
connectDB(process.env.MONGO_URI);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("🔑 GEMINI_API_KEY loaded:", !!process.env.GEMINI_API_KEY);
});
