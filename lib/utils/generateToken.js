import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userEmail, res) => {
  const token = jwt.sign({ userEmail }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  res.cookie("jwt", token, {
    maxAge: 12 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "development",
  });

  return token;
}