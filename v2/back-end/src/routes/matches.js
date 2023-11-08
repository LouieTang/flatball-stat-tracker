import express from "express";
import { getMatches, createMatch, getSingleMatch, deleteSingleMatch, patchSingleMatch } from "../controllers/matchesController.js";

const router = express.Router();

router.get("/", getMatches);

router.post("/", createMatch);

router.get("/:_id", getSingleMatch);

router.delete("/:_id", deleteSingleMatch);

router.patch("/:_id", patchSingleMatch);


export default router;