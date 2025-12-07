import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  summary: String,
  keyPoints: [String],
  keywords: [String],
  sentiment: String,
  rawGeminiResponse: mongoose.Schema.Types.Mixed,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

const documentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filename: String,
  originalName: String,
  textExtract: String,
  analysis: analysisSchema,
  size: Number,
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Document", documentSchema);
