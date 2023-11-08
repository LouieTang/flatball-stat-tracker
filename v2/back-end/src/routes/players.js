import express from "express";
import { createPlayer, deleteSinglePlayer, getSinglePlayer, getPlayers, patchSinglePlayer } from "../controllers/playersController.js";


const router = express.Router();

router.get("/", getPlayers);

router.post("/", createPlayer);

router.get("/:_id", getSinglePlayer);

router.delete("/:_id", deleteSinglePlayer);

router.patch("/:_id", patchSinglePlayer);

export default router;