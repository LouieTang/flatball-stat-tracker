import express from "express";
import { getTestPlayers } from "../controllers/testPlayersController.js";

const router = express.Router();

router.get("/", getTestPlayers);

export default router;