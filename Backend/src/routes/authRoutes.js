import express from "express";
import { register, login,logout, getProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES (No token required)
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes working" });
});

// PROTECTED ROUTE (Token required - auto from cookie)
router.get("/me", authMiddleware, getProfile);

export default router;
