import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Layout/Header";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { useAuth } from "./hooks/useAuth";
import ThemeProvider from "./contexts/ThemeProvider";
import NotFound from "./pages/NotFound";

export default function App() {
  const { user, logout, loading } = useAuth();

  // Compute auth from context `user` to avoid auto-login from stale localStorage.
  const isAuth = !!user;

  console.log("[App] Render - user:", user?.email, "loading:", loading, "isAuth:", isAuth);

  // While loading auth state, show loading screen
  if (loading) {
    console.log("[App] Showing loading screen");
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  console.log("[App] Routes configured - isAuth:", isAuth);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="bg-white dark:bg-gray-900 min-h-screen">
          <Header user={user} onLogout={logout} />
          <Routes>
            {/* Home route - show dashboard if authenticated, else login */}
            <Route 
              path="/" 
              element={isAuth ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
            />
            <Route path="/home" element={<Home />} />
            
            {/* Protected routes - show dashboard/history if authenticated */}
            <Route 
              path="/dashboard" 
              element={isAuth ? <Dashboard /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/history" 
              element={isAuth ? <History /> : <Navigate to="/" replace />} 
            />
            
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
