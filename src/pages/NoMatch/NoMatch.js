import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch } from "react-redux";
import { setBadId } from "../../redux/actions";
export const NoMatch = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBadId(false));
  }, []);
  return (
    <div style={{ marginTop: "50px" }}>
      <h1 as="h1">404 - Page Not Found</h1>
      <p>Oops! It seems the page you're looking for doesn't exist.</p>
      <button  onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default NoMatch;
