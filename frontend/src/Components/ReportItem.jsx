import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ReportItem = () => {
  const navigate = useNavigate();
  const { isAuthenticated, getAuthHeader } = useAuth();

  const [form, setForm] = useState({
    productName: "",
    description: "",
    finderName: "",
    contact: "",
    location: "",
    dateLost: "",
    productImage: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setForm({ ...form, productImage: file });

      // Create image preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validation
    if (
      !form.productName ||
      !form.description ||
      !form.finderName ||
      !form.contact ||
      !form.location ||
      !form.dateLost ||
      !form.productImage
    ) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("productName", form.productName);
      formData.append("description", form.description);
      formData.append("finderName", form.finderName);
      formData.append("contact", form.contact);
      formData.append("location", form.location);
      formData.append("dateLost", form.dateLost);
      formData.append("productImage", form.productImage);

      const response = await fetch("http://localhost:3000/api/lost-items", {
        method: "POST",
        headers: {
          ...getAuthHeader(),
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Item reported successfully! Redirecting...");
        setTimeout(() => navigate("/browse"), 2000);
      } else {
        setError(data.error || "Failed to report item");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Report Lost Item</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="productName"
              value={form.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the item in detail"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          {/* Finder Name */}
          <div>
            <label htmlFor="finderName" className="block text-sm font-medium text-gray-700 mb-2">
              Finder Name *
            </label>
            <input
              type="text"
              id="finderName"
              value={form.finderName}
              onChange={handleChange}
              placeholder="Name of the person who found the item"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Where was the item found?"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          {/* Date Lost */}
          <div>
            <label htmlFor="dateLost" className="block text-sm font-medium text-gray-700 mb-2">
              Date Found *
            </label>
            <input
              type="date"
              id="dateLost"
              value={form.dateLost}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          {/* Product Image */}
          <div>
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-2">
              Product Image *
            </label>
            <input
              type="file"
              id="productImage"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
            {imagePreview && (
              <div className="mt-3">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md border" />
              </div>
            )}
          </div>

          {/* Error/Success Messages */}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-semibold rounded-md transition duration-300 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
            }`}>
            {isLoading ? "Reporting Item..." : "Report Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportItem;
