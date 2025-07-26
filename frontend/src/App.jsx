import { useState, useEffect } from "react";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/test");
        const data = await response.json();
        setMessage(data.message);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to connect to backend");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Placeholder image component
  const NoImagePlaceholder = () => (
    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
      <svg
        className="w-8 h-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-8">MERN Stack with Vite</h1>

        <div className="mb-8 text-center">
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : (
            <p className="text-green-600 font-semibold">{message}</p>
          )}
        </div>

        {/* Registration Form */}
        <div className="mb-8">
          <RegistrationForm onUserRegistered={fetchUsers} />
        </div>

        {/* Display Users */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Registered Users</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            {users.length === 0 ? (
              <p className="text-gray-600 text-center">No users registered yet</p>
            ) : (
              <div className="grid gap-4">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center space-x-4 border-b border-gray-200 pb-4 last:border-b-0">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={`${user.name}'s profile`}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div style={{ display: user.profileImage ? "none" : "flex" }}>
                        <NoImagePlaceholder />
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">
                        Registered: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={fetchUsers}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
              Refresh Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
