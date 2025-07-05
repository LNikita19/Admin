import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}/resetPassword`, {
        Email: email,
        Password: newPassword,
      });

      if (response.data.status) {
        toast.success("Password updated");
        navigate("/login");
      } else {
        toast.error("Failed to update password");
      }
    } catch (err) {
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9E1] flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md border-2 border-[#361A06]">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded pr-10"
            />
            <div
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          </div>

          <button type="submit" className="w-full bg-[#361A06] text-white p-3 rounded">
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
