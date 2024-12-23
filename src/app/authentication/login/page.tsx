"use client"
import { useState } from "react";
import { auth } from "../../../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../../../../firebase";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Login successful!");
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.log('Unknown error:', error);
        }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Login with Google successful!");
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.log('Unknown error:', error);
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-lg font-bold">Log In</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Log In
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Log In with Google
        </button>
      </form>
    </div>
  );
}
