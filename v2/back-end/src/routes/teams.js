import express from "express";
import { getTeams, createTeam, getSingleTeam, deleteSingleTeam, patchSingleTeam } from "../controllers/teams.js"

const router = express.Router();

router.get("/", getTeams);

router.post("/", createTeam);

router.get("/:_id", getSingleTeam);

router.delete("/:_id", deleteSingleTeam);

router.patch("/:_id", patchSingleTeam);

export default router;