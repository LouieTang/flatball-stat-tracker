import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/testUsersController.js"

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", getUser);

export default router;