import { Request, Response } from "express";
import { dbConnect } from "../../lib/dbConnect";
import User from "../../models/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { email, password } = req.body;

  try {
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: "JWT secret is not defined" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}