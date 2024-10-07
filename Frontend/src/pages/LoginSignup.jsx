import React, { useState } from "react";
import "./css/LoginSignup.css";

function LoginSignup() {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Save token and user details
        localStorage.setItem("auth-token", responseData.token);
        localStorage.setItem("userId", responseData.userId);
        setErrorMessage(""); // Clear any previous error messages
        // Redirect after successful login
        window.location.replace("/");
      } else {
        // Display error message from the response
        setErrorMessage(
          responseData.error || "Login failed. Please try again."
        );
      }
    } catch (err) {
      setErrorMessage(
        err.message || "An unexpected error occurred during login."
      );
    }
  };

  const signup = async () => {
    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setErrorMessage(""); // Clear any previous error messages
        // After successful signup, switch to login
        setState("Login");
      } else {
        // Display error message from the response
        setErrorMessage(
          responseData.error || "Signup failed. Please try again."
        );
      }
    } catch (err) {
      setErrorMessage(
        err.message || "An unexpected error occurred during signup."
      );
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        {errorMessage && <p className="loginsignup-error">{errorMessage}</p>}
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign up" ? (
            <input
              name="name"
              value={formData.name}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="password"
          />
        </div>

        <button
          onClick={() => {
            state === "Sign up" ? signup() : login();
          }}
        >
          Continue
        </button>

        {state === "Sign up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign up");
              }}
            >
              Sign Up
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p> By continuing I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
