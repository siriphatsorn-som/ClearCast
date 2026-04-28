import { Router } from "express";
import { addFavorite, getFavorites, deleteFavorite } from "../controllers/favoritesController.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.use(verifyToken);

router.post("/", addFavorite);
router.get("/", getFavorites);
router.delete("/:id", deleteFavorite);

export default router;