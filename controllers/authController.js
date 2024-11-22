import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import bcrypt from 'bcryptjs';
import { createUser, getUser } from '../models/usersModel.js';
import { createUserBalance } from '../models/userBalanceModel.js';

export const register = async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 102,
        message: "Parameter email tidak sesuai format",
        data: null
      });
    }

    const existingEmail = await getUser(email);
    if (existingEmail) {
      return res.status(400).json({ error: "Email sudah dipakai" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: 102,
        message: "Parameter password minimal 8 karakter",
        data: null
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await createUser(email, first_name, last_name, hashedPassword);

    if (newUser) {
      await createUserBalance(email);

      res.status(200).json({
        status: 0,
        message: "Registrasi berhasil silahkan login",
        data: null
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in register controller", error);
    res.status(500).json({ error: "internal server error" });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUser(email);
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 102,
        message: "Parameter email tidak sesuai format",
        data: null
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: 102,
        message: "Parameter password minimal 8 karakter",
        data: null
      });
    }

    if (!user || !isPasswordCorrect) {
      return res.status(401).json({
        status: 103,
        message: "Username atau password salah",
        data: null
      });
    }

    const token = generateTokenAndSetCookie(user.email, res);
    res.status(200).json({
      status: 0,
      message: "Login Sukses",
      data: {
        token
      }
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ error: "internal server error" });
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      status: 0,
      message: "Logout Sukses",
      data: null
    });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ error: "internal server error" });
  }
}