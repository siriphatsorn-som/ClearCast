import { Router } from "express";
import { getReviews, createReview, updateReview, deleteReview } from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.get("/", getReviews);                        
router.post("/", verifyToken, createReview);
router.put("/:id", verifyToken, updateReview);
router.delete("/:id", verifyToken, deleteReview);  

export default router;