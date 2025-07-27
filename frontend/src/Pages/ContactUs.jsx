import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid.";
    }
    if (!formData.subject) tempErrors.subject = "Subject is required.";
    if (!formData.message) tempErrors.message = "Message is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmissionStatus(null);

      // Simulate an API call
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSubmissionStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch (error) {
        setSubmissionStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-8 bg-gray-50 rounded-2xl shadow-lg font-sans">
      <div className="flex flex-col md:flex-row gap-16">
        {/* Contact Information Section */}
        <div className="md:w-1/3 bg-black/90 text-white p-8 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
          <p className="mb-6">Fill up the form and our team will get back to you within 24 hours.</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span>📞</span> +1 (123) 456-7890
            </li>
            <li className="flex items-center gap-3">
              <span>✉️</span> hello@example.com
            </li>
            <li className="flex items-center gap-3">
              <span>📍</span> 123 Innovation Drive, Tech City, USA
            </li>
          </ul>
        </div>

        {/* Contact Form Section */}
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div className="mb-5">
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors.subject && <p className="mt-2 text-sm text-red-600">{errors.subject}</p>}
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required></textarea>
              {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 text-white bg-black rounded-lg hover:text-semibold focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm disabled:bg-gray-400 disabled:cursor-not-allowed">
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {submissionStatus === "success" && (
              <p className="mt-4 text-center text-green-600 font-semibold">Message sent successfully!</p>
            )}
            {submissionStatus === "error" && (
              <p className="mt-4 text-center text-red-600 font-semibold">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
