import React from "react";
import PDFUploader from "../components/Upload/PDFUploader";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-text">Dashboard</h1>
        <div className="bg-white dark:bg-secondary rounded-lg shadow-md p-6">
          <PDFUploader />
        </div>
      </div>
    </main>
  );
}
