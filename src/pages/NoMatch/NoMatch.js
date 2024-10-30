import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const NoMatch = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <div textAlign="center" style={{ marginTop: "50px" }}>
      <h1 as="h1">404 - Page Not Found</h1>
      <p>Oops! It seems the page you're looking for doesn't exist.</p>
      <button primary onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default NoMatch;
