import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadAndAnalyze, getHistory, getDocument, deleteDocument } from "../controllers/docController.js";
const router = express.Router();

router.post("/upload", authMiddleware, upload.single("file"), uploadAndAnalyze);
router.get("/history", authMiddleware, getHistory);
router.get("/:id", authMiddleware, getDocument);
router.delete("/:id", authMiddleware, deleteDocument);

export default router;
