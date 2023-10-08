import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToDirect = () => {
  const [counter, setcounter] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setcounter((prevcounter) => prevcounter - 1);
    }, 1000);

    return () => clearInterval(timer); // Clear the interval on unmount
  }, []);

  useEffect(() => {
    if (counter < 1) {
      navigate("/login"); // Replace with your desired route
    }
  }, [counter, navigate]);

  return (
    <div
      style={{
        marginTop: 100,
        textAlign: "center",
      }}
    >
      <h3>Redirecting to login in {counter} seconds</h3>
    </div>
  );
};

export default LoadingToDirect;
