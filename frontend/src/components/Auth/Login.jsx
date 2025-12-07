import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import Button from "../../components/Shared/Button";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      console.log("[Login] Attempting login with:", form.email);
      console.log("[Login] Form data:", JSON.stringify(form));
      const res = await api.post("api/auth/login", form);
      console.log("[Login] Response received:", res.data);
      console.log("[Login] Response status:", res.status);
      
      // The backend returns user in response, token is in cookie or response
      const token = res.data.token || "logged_in_" + Date.now();
      
      console.log("[Login] Token:", token);
      console.log("[Login] User:", res.data.user);
      console.log("[Login] Storing token and user...");
      login(token, res.data.user);
      console.log("[Login] State updated, navigating to dashboard...");
      
      // Navigate immediately - don't wait for state to update
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("[Login] Full error object:", err);
      console.error("[Login] Error config:", err?.config);
      console.error("[Login] Error response:", err?.response);
      console.error("[Login] Error response data:", err?.response?.data);
      console.error("[Login] Error message:", err?.message);
      console.error("[Login] Error status:", err?.response?.status);
      setError(err?.response?.data?.message || err?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card p-8 rounded-xl shadow-card"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-text">Login</h2>

        {error && <p className="text-destructive text-sm mb-4">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-input bg-card p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-input bg-card p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />

        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="mt-6 text-center text-text/80">
          Don't have an account?{" "}
          <a href="/register" className="text-primary hover:underline">Register</a>
        </p>
      </form>
    </div>
  );
}
