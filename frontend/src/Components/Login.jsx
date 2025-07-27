import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext"; // Adjust path as needed

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Basic validation
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(form.email, form.password);

      if (result.success) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500); // Redirect to home page
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-2 bg-transparent outline-none text-gray-800"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2 bg-transparent outline-none text-gray-800"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-semibold rounded-md transition duration-300 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
            }`}>
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="text-blue-600 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
