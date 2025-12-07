import React, { useState, useRef } from "react";
import api from "../../services/api";
import Spinner from "../Shared/Spinner";
import AnalysisResult from "../Results/AnalysisResult";
import Button from "../Shared/Button";
import { FaCloudUploadAlt, FaFilePdf, FaTimes, FaCheckCircle } from "react-icons/fa";

export default function PDFUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  function onFileChange(e) {
    setError("");
    setResult(null);
    const f = e.target.files[0];
    if (!f) return;
    if (f.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setFile(null);
      return;
    }
    setFile(f);
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const f = e.dataTransfer.files[0];
    if (!f) return;
    if (f.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setFile(null);
      return;
    }
    setFile(f);
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) {
      setError("Please choose a PDF to upload.");
      return;
    }
    setUploading(true);
    setProgress(0);
    setError("");
    setResult(null);

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await api.post("api/docs/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) => {
          if (p.total) {
            setProgress(Math.round((p.loaded * 100) / p.total));
          }
        },
        timeout: 120000
      });

      console.log("Upload response:", res.data);
      
      if (res?.data?.analysis) {
        setResult(res.data);
      } else if (res?.data?.id) {
        const id = res.data.id;
        const docRes = await api.get(`/api/docs/${id}`);
        console.log("Document fetch response:", docRes.data);
        setResult(docRes.data);
      } else {
        setResult(res.data);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err?.response?.data?.message || "Upload failed. Try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Upload Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Document Analysis</h2>
            <p className="text-gray-600">Upload a PDF and get instant AI-powered insights</p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive 
                  ? "border-indigo-500 bg-indigo-50" 
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={onFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4">
                  <FaCloudUploadAlt className="w-12 h-12 text-gray-400 transition-transform hover:scale-110" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {dragActive ? "Drop your PDF here" : "Drag & drop your PDF here"}
                </h3>
                <p className="text-gray-500 mb-4">or click to browse</p>
                <p className="text-sm text-gray-400">Maximum file size: 50MB</p>
              </div>
            </div>
          </div>

          {/* File Preview */}
          {file && (
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaFilePdf className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setFile(null); setResult(null); setError(""); }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-red-600">{error}</span>
              </div>
            </div>
          )}

          {/* Upload Button */}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={handleUpload}
              disabled={!file || uploading}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                !file || uploading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transform hover:scale-105"
              }`}
            >
              {uploading ? (
                <div className="flex items-center space-x-2">
                  <Spinner size={4} />
                  <span>Uploading... {progress}%</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="w-4 h-4" />
                  <span>Analyze Document</span>
                </div>
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                Analyzing your document with AI...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AI Results */}
      {result && (
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Analysis Results</h3>
                <p className="text-gray-600">AI-powered insights from your document</p>
              </div>
              <AnalysisResult data={result} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
