import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg1 from "../assets/images/bg1.jpg"; // import background image

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success) {
        navigate("/mood", { state: { username } });
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "flex-end", // move content to right
        alignItems: "center",
        color: "white",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingRight: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Login
        </h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "250px",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "25px",
            border: "none",
            outline: "none",
            fontSize: "14px",
            textAlign: "center",
          }}
        />

        {/* Password field with eye toggle */}
        <div
          style={{
            position: "relative",
            width: "250px",
            marginBottom: "20px",
          }}
        >
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "25px",
              border: "none",
              outline: "none",
              fontSize: "14px",
              textAlign: "center",
            }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "18px",
              userSelect: "none",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "250px",
            padding: "12px",
            background: "linear-gradient(135deg, #051431ff, #4169E1)",
            color: "white",
            border: "none",
            borderRadius: "25px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s",
            marginBottom: "15px",
          }}
          onMouseOver={(e) =>
            (e.target.style.background =
              "linear-gradient(135deg, #4169E1, #1E3C72)")
          }
          onMouseOut={(e) =>
            (e.target.style.background =
              "linear-gradient(135deg, #1E3C72, #4169E1)")
          }
        >
          Login
        </button>

        {/* Forgot password link */}
        <p
          style={{
            marginBottom: "20px",
            fontSize: "14px",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => alert("Forgot password feature coming soon!")}
        >
          Forgot Password?
        </p>

        {/* Sign up button */}
        <button
          onClick={() => navigate("/signup")}
          style={{
            width: "250px",
            padding: "12px",
            background: "linear-gradient(135deg, #4169E1, #1E3C72)",
            color: "white",
            border: "none",
            borderRadius: "25px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.background =
              "linear-gradient(135deg, #1E3C72, #4169E1)")
          }
          onMouseOut={(e) =>
            (e.target.style.background =
              "linear-gradient(135deg, #4169E1, #1E3C72)")
          }
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
