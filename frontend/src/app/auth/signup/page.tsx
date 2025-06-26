"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      localStorage.setItem("token", data.token);
      router.push("/todo");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md animate-fade-in"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        />
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="mt-4 text-center text-sm">
          Already have an account? <a href="/auth/login" className="text-green-600 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
}
