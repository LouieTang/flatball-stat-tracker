import express from "express";
import { verifyLogin } from "../controllers/usersController.js";

const router = express.Router();

router.post("/", verifyLogin);

export default router;