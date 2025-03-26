import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("❌ No token found in cookies");
    return res.status(401).json({ message: "Not Authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      console.log("❌ Invalid Token:", err);
      return res.status(403).json({ message: "Token is not Valid!" });
    }

    console.log("✅ Token payload:", payload);
    
    req.userId = payload.id;  // Ensure this is consistent across backend
    console.log("✅ Extracted userId:", req.userId);

    next();
  });
};

