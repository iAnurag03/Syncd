import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getTrendingSongs, getSongById } from "../controllers/songs.controller.js";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/trending", getTrendingSongs);
router.get("/:id", getSongById);

export default router;