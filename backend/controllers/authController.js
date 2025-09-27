import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try{
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const accessToken = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return res
      .status(201)
      .json({
        message: "User registered successfully",
        accessToken,
        refreshToken,
      });
  }
  catch(err){
    console.log(err);
    console.error("Error during registration:", err); 
    return res.status(500).json({ message: "Internal Server Error" });
  }
  
};

export const signin = async (req, res) => {
  try{
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return res
      .status(200)
      .json({ message: "Login successful", accessToken, refreshToken });
  }
  catch(err){
    console.log(err);
    console.error("Error during login:", err); 
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateToken(user.id);
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};
