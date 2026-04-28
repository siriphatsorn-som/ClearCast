import { Router } from "express";
import { getPhotoScore } from "../controllers/photoController.js";

const router = Router();

router.get("/", getPhotoScore);

export default router;