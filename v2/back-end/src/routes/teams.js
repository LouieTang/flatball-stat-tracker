import express from "express";
import { getTeams, createTeam, getSingleTeamInfo, deleteSingleTeam, patchSingleTeam, getSingleTeamPlayers } from "../controllers/teamsController.js"

const router = express.Router();

router.get("/", getTeams);

router.post("/", createTeam);

router.get("/:_id", getSingleTeamInfo);

router.delete("/:_id", deleteSingleTeam);

router.patch("/:_id", patchSingleTeam);

router.get("/:_id", getSingleTeamPlayers);

export default router;