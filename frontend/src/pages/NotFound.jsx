import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Shared/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-text mb-6">Page Not Found</h2>
        <p className="text-text/80 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button 
          variant="primary" 
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}
