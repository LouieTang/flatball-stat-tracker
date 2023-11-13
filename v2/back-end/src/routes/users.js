import express from "express";
import { verifyLogin, registerUser, getUserTeams } from "../controllers/usersController.js";

const router = express.Router();

router.post("/login", verifyLogin);
router.post("/register", registerUser);
router.post("/teams", getUserTeams);

export default router;