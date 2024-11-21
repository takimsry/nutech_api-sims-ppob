import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { getProfile, updateProfile, updateProfileImage } from '../controllers/userController.js';
import { getBanners, getServices } from '../controllers/infoController.js';
import { getBalance, getTransactions, makeTransaction, topUp } from '../controllers/transactionController.js';
import { handleMulterErrors, upload } from '../lib/config/multerConfig.js';

const router = express.Router();

router.post("/registration", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", protectRoute, getProfile);
router.put("/profile/update", protectRoute, updateProfile);
router.put("/profile/image", protectRoute, upload.single("file"), handleMulterErrors, updateProfileImage);

router.get("/banner", getBanners);
router.get("/services", protectRoute, getServices);

router.get("/balance", protectRoute, getBalance);
router.post("/topup", protectRoute, topUp);
router.post("/transaction", protectRoute, makeTransaction);
router.get("/transaction/history", protectRoute, getTransactions);

export default router;