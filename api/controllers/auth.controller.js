import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, cnic, password } = req.body;

  try {
    // Validate CNIC format (must be exactly 13 digits)
    const cnicRegex = /^\d{13}$/;
    if (!cnicRegex.test(cnic)) {
      return res.status(400).json({ message: "CNIC must be exactly 13 digits!" });
    }

    // Check if CNIC is already registered
    const existingUser = await prisma.user.findUnique({
      where: { cnic },
    });

    if (existingUser) {
      return res.status(400).json({ message: "CNIC already registered!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        username,
        cnic,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("🔥 Registration Error:", err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { cnic, password } = req.body;

  try {
    // Check if user exists with CNIC
    const user = await prisma.user.findUnique({
      where: { cnic },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // Generate JWT token
    const age = 1000 * 60 * 60 * 24 * 7; // 1 week
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: _, ...userInfo } = user; // Exclude password from response

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.error("🔥 Login Error:", err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
