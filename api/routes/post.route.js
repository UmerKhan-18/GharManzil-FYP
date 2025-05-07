import express from "express";
import {verifyToken} from "../middleware/verifyToken.js";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller.js";
import { upload } from "../middleware/upload.js";
import { createPostWithDocument } from "../controllers/post.controller.js";

const router = express.Router();


router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);
router.post("/upload", verifyToken, upload.fields([
  { name: "propertyDoc", maxCount: 1 },
  { name: "cnicFront", maxCount: 1 },
  { name: "cnicBack", maxCount: 1 }
]), createPostWithDocument);

export default router;
