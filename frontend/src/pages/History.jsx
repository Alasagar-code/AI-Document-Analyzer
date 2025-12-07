import React, { useEffect, useState, useRef } from "react";
import api from "../services/api";
import AnalysisResult from "../components/Results/AnalysisResult.jsx";
import Button from "../components/Shared/Button";
import { useTheme } from "../hooks/useTheme";

export default function History() {
  const { isDark } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const analysisRef = useRef(null);

  useEffect(() => {
    if (analysisRef.current) {
      analysisRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedDoc]);

  useEffect(() => {
    api.get("api/docs/history")
      .then(res => {
        // Backend now returns array directly; handle both old and new formats
        const docs = Array.isArray(res.data) ? res.data : (res.data?.documents || []);
        setItems(docs);
      })
      .catch(err => setError(err?.response?.data?.message || "Failed to fetch history"))
      .finally(() => setLoading(false));
  }, []);

  // Handle both array and wrapped response
  const docs = Array.isArray(items) ? items : (items?.documents || []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;
    
    try {
      await api.delete(`/api/docs/${id}`);
      
      // Update local state
      setItems(prev => prev.filter(doc => doc._id !== id));
      
      // If this was the selected document, clear selection
      if (selectedDoc === id) {
        setSelectedDoc(null);
      }
      
      // Optional: Show success message
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete document");
    }
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-text">Upload History</h1>

        {loading && <div className="text-text/80">Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}

        {!loading && docs.length === 0 && <div className="text-sm text-text/80">No uploads yet.</div>}

        <ul className="space-y-4 mt-4">
          {docs.map((it) => (
            <li key={it._id} className="bg-card p-6 rounded-lg shadow-card flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="font-medium text-text">{it.filename || "Document"}</div>
                <div className="text-sm text-text/80">
                  Uploaded: {it.uploadedAt ? new Date(it.uploadedAt).toLocaleString() : "Unknown"}
                </div>
                {it.analysis?.summary && (
                  <div className="text-sm mt-2 text-text/80">
                    {it.analysis.summary.slice(0, 200)}
                    {it.analysis.summary.length > 200 ? "..." : ""}
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="secondary" 
                  onClick={() => setSelectedDoc(it._id === selectedDoc ? null : it._id)}
                  className="w-full sm:w-auto"
                >
                  {selectedDoc === it._id ? "Hide" : "View"}
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDelete(it._id)}
                  className="w-full sm:w-auto"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>

        {selectedDoc && (
          <div 
            className="mt-8 bg-card p-8 rounded-lg shadow-card"
            ref={analysisRef}
          >
            <Button 
              variant="ghost" 
              onClick={() => setSelectedDoc(null)}
              className="mb-6"
            >
              ← Back
            </Button>
            {items.find(it => it._id === selectedDoc) && (
              <AnalysisResult data={items.find(it => it._id === selectedDoc)} />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
