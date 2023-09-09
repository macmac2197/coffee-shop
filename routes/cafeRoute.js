import express from "express";
import {
  getCafes,
  createCafe,
  filterCafeByLocation,
  updateCafe,
  deleteCafe,
} from "../controllers/cafeController.js";

const router = express.Router();

// GET Request
router.get("/", getCafes);
router.get("/location", filterCafeByLocation);

// POST Request
router.post("/", createCafe);

// PUT Request
router.put("/:id", updateCafe);

// DELETE Request
router.delete("/:id", deleteCafe);

export default router;
