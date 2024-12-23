"use client"
import { useState } from "react";
import { auth } from "../../../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../../../../firebase";

export default function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            alert("Signup successful!");
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.log('Unknown error:', error);
            }
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            alert("Signup with Google successful!");
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
                onSubmit={handleSignup}
                className="bg-white p-6 rounded shadow-md w-80 space-y-4"
            >
                <h2 className="text-lg font-bold">Sign Up</h2>
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
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Sign Up
                </button>
                <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Sign Up with Google
                </button>
            </form>
        </div>
    );
}
