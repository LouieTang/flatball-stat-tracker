import express from "express";
import { registerUser, loginUser, getUser, updateTestTeam } from "../controllers/testUsersController.js"

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", getUser);
router.put("/team", updateTestTeam);

export default router;