import express from "express";
import { verifyLogin, registerUser } from "../controllers/usersController.js";

const router = express.Router();

router.post("/login", verifyLogin);
router.post("/register", registerUser);

export default router;