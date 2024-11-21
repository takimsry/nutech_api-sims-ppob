import { getUser } from "../models/usersModel.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  const handleTokenError = () => {
    return res.status(401).json({
      status: 108,
      error: "Token tidak valid atau kadaluwarsa",
      data: null
    });
  }

  try {
    const token = req.cookies.jwt;
    if (!token) {
      return handleTokenError();
    }

    const decoded = jwt.verify(token ? token : "", process.env.JWT_SECRET);
    if (!decoded) {
      return handleTokenError();
    }

    const user = await getUser(decoded.userEmail);
    if (!user) {
      return handleTokenError();
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
