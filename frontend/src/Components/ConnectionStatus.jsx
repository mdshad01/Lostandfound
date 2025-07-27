import React from "react";

const ConnectionStatus = ({ isConnected }) => {
  return (
    <div className="connection-status">
      <div className={`status-indicator ${isConnected ? "connected" : "disconnected"}`}>
        {isConnected ? "🟢" : "🔴"}
        {isConnected ? "Connected to MongoDB" : "Disconnected"}
      </div>
    </div>
  );
};

export default ConnectionStatus;
