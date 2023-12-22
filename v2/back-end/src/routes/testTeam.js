import express from "express";
import { getTestTeam, updateTestTeam } from "../controllers/testTeamController.js"

const router = express.Router();

router.get("/", getTestTeam);

router.put("/", updateTestTeam);

export default router;