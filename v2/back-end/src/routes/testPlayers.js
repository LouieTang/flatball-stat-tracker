import express from "express";
import { getTestPlayers, updateTestPlayers } from "../controllers/testPlayersController.js";

const router = express.Router();

router.get("/", getTestPlayers);

router.put("/", updateTestPlayers)

export default router;