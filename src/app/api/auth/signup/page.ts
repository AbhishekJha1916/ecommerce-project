import { Request, Response } from "express";
import { dbConnect } from "../../../lib/dbConnect";
import User from "../../../models/userModel";

export default async function handler(req: Request, res: Response) {

    const { email, password, mobile } = req.body;

    try {
        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ email, password, mobile });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}
