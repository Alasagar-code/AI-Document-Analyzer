import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Button from "../../components/Shared/Button";

export default function Register() {
  const navigate = useNavigate();
  // no auto-login after registration — we don't need login() here
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      await api.post("api/auth/register", user);

      setSuccess("Registration Successful! Please log in.");

      // Do NOT auto-login after registration; redirect to login page
      navigate("/login", { replace: true });

    } catch (err) {
      setError(err?.response?.data?.message || "Server error. Try again later!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-card shadow-card p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-text">Create Account</h2>

        {error && (
          <p className="bg-destructive/10 text-destructive p-3 rounded-lg mb-4 text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-success/10 text-success p-3 rounded-lg mb-4 text-center">
            {success}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full border border-input bg-card p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full border border-input bg-card p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full border border-input bg-card p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />

        <Button 
          type="submit" 
          className="w-full"
        >
          Register
        </Button>

        <p className="mt-6 text-center text-text/80">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}
