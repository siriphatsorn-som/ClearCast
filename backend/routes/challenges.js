import { Router } from "express";
import {
  getCollection,
  uploadEntry,
  updateEntry,
  deleteEntry,
  getCommunity,
} from "../controllers/challengeController.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/community", getCommunity);
router.get("/", verifyToken, getCollection);
router.post("/:key", verifyToken, upload.single("image"), uploadEntry);
router.put("/:key", verifyToken, updateEntry);
router.delete("/:key", verifyToken, deleteEntry);

export default router;
