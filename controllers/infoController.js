import { getAllBanners } from "../models/bannersModel.js"
import { getAllServices } from "../models/servicesModel.js";

export const getBanners = async (req, res) => {
  try {
    const banners = await getAllBanners();

    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: banners
    });
  } catch (error) {
    console.log("Error in getBanners controller", error);
    res.status(500).json({ error: "internal server error" });
  }
}

export const getServices = async (req, res) => {
  try {
    const services = await getAllServices();

    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: services
    });
  } catch (error) {
    console.log("Error in getServices controller", error);
    res.status(500).json({ error: "internal server error" });
  }
}