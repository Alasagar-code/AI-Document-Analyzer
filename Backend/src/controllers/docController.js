// src/controllers/docController.js

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

let pdfjsLib = null;
let pdfParse = null;

try {
  pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
} catch (e) {
  console.warn("pdfjs-dist load failed:", e.message);
  pdfjsLib = null;
}

try {
  pdfParse = require("pdf-parse-fixed");
} catch (e) {
  console.warn("pdf-parse-fixed load failed:", e.message);
  pdfParse = null;
}

import Document from "../models/documentModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ---------------- INIT GEMINI CLIENT ----------------
let genAI = null;
if (process.env.GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  } catch (e) {
    console.warn("Gemini init failed:", e.message || e);
    genAI = null;
  }
}

// ---------------- PDF EXTRACTORS ----------------
async function extractWithPdfJs(buffer) {
  const uint8Array = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
  const pdf = await loadingTask.promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(it => it.str).join(" ") + "\n";
  }
  return text;
}

async function extractWithPdfParse(buffer) {
  const data = await pdfParse(buffer);
  return data?.text || "";
}

// ---------------- MAIN CONTROLLER ----------------
export const uploadAndAnalyze = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    console.log("Received file:", {
      name: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    let extractedText = "";
    if (pdfjsLib) {
      try {
        extractedText = await extractWithPdfJs(req.file.buffer);
      } catch (e) {
        console.warn("pdfjs failed, fallback", e.message);
        if (pdfParse) extractedText = await extractWithPdfParse(req.file.buffer);
        else throw e;
      }
    } else if (pdfParse) {
      extractedText = await extractWithPdfParse(req.file.buffer);
    } else {
      return res.status(500).json({
        message: "No PDF extractor available",
        hint: "Install pdfjs-dist or pdf-parse-fixed"
      });
    }

    if (!extractedText.trim()) {
      return res.status(400).json({
        message: "No text extracted. Use a non-scanned PDF."
      });
    }

    const structured =
      req.body.structured === "true" ||
      req.body.structured === true;

    const prompt = `
You are an AI that analyzes PDF documents.

Document Text:
"""${extractedText.slice(0, 100000)}"""

Provide:
1) Summmary (3–6 sentences)
2) 6–10 bullet key points
3) 10–15 keywords
4) Tone: Positive / Neutral / Negative
5) Short recommendations

If structured output requested, return EXACT JSON:
{
  "summary": "...",
  "keyPoints": ["..."],
  "keywords": ["..."],
  "sentiment": "Positive|Neutral|Negative",
  "notes": "short recommendations"
}
`;

    if (!genAI) {
      return res.status(500).json({
        message: "Gemini not configured. Add GEMINI_API_KEY to .env"
      });
    }

    const modelName = process.env.GEMINI_MODEL || "models/gemini-2.5-flash"; // FIXED FALLBACK
    let modelOutput = "";

    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = result.response;
      modelOutput = response.text();
    } catch (e) {
      console.error("Gemini Error:", e.message);
      return res.status(502).json({
        message: "Gemini request failed",
        error: e.message
      });
    }

    let parsed;
    if (structured) {
      try {
        const cleanOutput = modelOutput.replaceAll("```json", "").replaceAll("```", "").trim();
        parsed = JSON.parse(cleanOutput);
      } catch {
        parsed = {
          summary: modelOutput,
          keyPoints: [],
          keywords: [],
          sentiment: "Neutral",
          notes: "Model returned non-JSON output"
        };
      }
    } else {
      parsed = {
        summary: modelOutput,
        keyPoints: [],
        keywords: [],
        sentiment: "Unknown",
        notes: ""
      };
    }
    // Store raw Gemini response
    parsed.rawGeminiResponse = modelOutput;

    const doc = await Document.create({
      owner: req.user?._id || null,
      filename: req.file.originalname,
      originalName: req.file.originalname,
      textExtract: extractedText.slice(0, 1_000_000),
      analysis: parsed,
      size: req.file.size
    });

    return res.status(201).json({ document: doc });
  } catch (err) {
    console.error("uploadAndAnalyze error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ---------------- HISTORY ----------------
export const getHistory = async (req, res) => {
  try {
    const docs = await Document.find({ owner: req.user._id })
      .sort({ uploadedAt: -1 })
      .limit(50);
    res.json({ documents: docs });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- GET ONE DOCUMENT ----------------

export const getDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch file that belongs to logged-in user
    const document = await Document.findOne({ _id: id, owner: req.user._id });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({ document });
  } catch (error) {
    console.error("Get Document Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete document by ID
 */
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete document that belongs to logged-in user
    const document = await Document.findOneAndDelete({
      _id: id,
      owner: req.user._id
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Delete Document Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
