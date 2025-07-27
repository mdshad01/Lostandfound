const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Include cookies for CORS
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Health check
  checkHealth() {
    return this.request("/health");
  }

  // User operations
  getUsers() {
    return this.request("/users");
  }

  createUser(userData) {
    return this.request("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }
}

export default new ApiService();
