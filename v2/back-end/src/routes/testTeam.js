import express from "express";
import { getTestTeam } from "../controllers/testTeamController.js"

const router = express.Router();

router.get("/", getTestTeam);

export default router;