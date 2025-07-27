import React, { useState, useEffect } from "react";
import { FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";

const ItemsFound = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/lost-items");
      const data = await response.json();

      if (response.ok) {
        setItems(data.items);
      } else {
        setError(data.error || "Failed to fetch items");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading lost items...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Browse Lost Items</h1>

        {items.length === 0 ? (
          <div className="text-center text-gray-600 text-xl">No lost items reported yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Item Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Item Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.productName}</h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>

                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-blue-500" />
                      <span>Found by: {item.finderName}</span>
                    </div>

                    <div className="flex items-center">
                      <FaPhone className="mr-2 text-green-500" />
                      <span>{item.contact}</span>
                    </div>

                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-red-500" />
                      <span>{item.location}</span>
                    </div>

                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-purple-500" />
                      <span>Found on: {formatDate(item.dateLost)}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">Reported by: {item.reportedBy?.username || "Unknown"}</div>
                    <div className="text-xs text-gray-500">Posted: {formatDate(item.createdAt)}</div>
                  </div>

                  {/* Contact Button */}
                  <div className="mt-4">
                    <a
                      href={`tel:${item.contact}`}
                      className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 text-center block">
                      Contact Finder
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsFound;
