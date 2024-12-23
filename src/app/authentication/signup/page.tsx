"use client"
import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "", mobile: "" });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert("Passwords do not match");

    try {
      const res = await axios.post("/api/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("An error occurred during signup");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
      <input name="mobile" type="text" placeholder="Mobile Number" onChange={handleChange} required />
      <button type="submit">Signup</button>
    </form>
  );
}
