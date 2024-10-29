import React, { useState } from "react";
import "./css/NewPassword.css";
import { useNavigate, useParams } from "react-router-dom";
function NewPassword() {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNewPassword = () => {
    fetch("https://cloth-store-backend-kruy.onrender.com/newpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: resetToken,
        userId: userId,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }),
    })
      .then((res) => {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="NewPasswordContainer">
      <div className="box">
        <h2>Add New Password</h2>
        <input
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={changeHandler}
          placeholder="Enter your New Password"
        />
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={changeHandler}
          placeholder="Confirm Password"
        />
        <button onClick={handleNewPassword}>Update Password</button>
      </div>
    </div>
  );
}

export default NewPassword;
