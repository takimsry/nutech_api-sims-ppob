import { updateProfileImg, updateUser } from "../models/usersModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: {
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        profile_img: req.user.profile_image
      }
    });
  } catch (error) {
    console.log("Error in getProfile controller", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}

export const updateProfile = async (req, res) => {
  const { first_name, last_name } = req.body;
  const userEmail = req.user.email;

  try {
    const updatedOn = new Date().toLocaleString('en-GB');


    const updatedUser = await updateUser(userEmail, first_name, last_name, updatedOn);

    if (updatedUser) {
      res.status(200).json({
        status: 0,
        message: "Update Profile berhasil",
        data: {
          email: userEmail,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          profile_img: updatedUser.profile_image
        }
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in updateProfile controller", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}

export const updateProfileImage = async (req, res) => {
  const userEmail = req.user.email;
  const profileImg = req.user.profile_image;

  try {
    if (profileImg) {
      await cloudinary.uploader.destroy(`sims-ppob/${profileImg.split("/").pop().split(".")[0]}`);
    }

    const base64Image = req.file.buffer.toString('base64');
    const uploadedResponse = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
      folder: 'sims-ppob'
    });
    const imageUrl = uploadedResponse.secure_url;

    const updatedOn = new Date().toLocaleString('en-GB');

    const updatedUser = await updateProfileImg(userEmail, imageUrl, updatedOn);

    if (updatedUser) {
      res.status(200).json({
        status: 0,
        message: "Update Profile Image berhasil",
        data: {
          email: userEmail,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          profile_img: updatedUser.profile_image
        }
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in updateProfileImage controller", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
