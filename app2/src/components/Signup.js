import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupBg from "../assets/images/signup1.jpg"; // ✅ import background image

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful! Please log in.");
        setTimeout(() => navigate("/"), 1500); // redirect to login after delay
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundImage: `url(${signupBg})`, // ✅ set image background
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          padding: "30px",
          borderRadius: "12px",
          width: "300px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "8px 0",
            border: "none",
            borderRadius: "6px",
          }}
        />
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              margin: "8px 0",
              border: "none",
              borderRadius: "6px",
            }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "12px",
            border: "none",
            borderRadius: "6px",
            background: "#fff",
            color: "#2a5298",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
        <p style={{ marginTop: "15px", fontSize: "14px", color: "#eee" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{ color: "#fff", cursor: "pointer", textDecoration: "underline" }}
          >
            Login
          </span>
        </p>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Signup;
