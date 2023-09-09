import express from "express";
import {
  getEmployees,
  createEmployee,
  getEmployeesByCafe,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

// GET Request
router.get("/", getEmployees);
router.get("/cafe", getEmployeesByCafe);

// POST Request
router.post("/", createEmployee);

// PUT Request
router.put("/:id", updateEmployee);

// DELETE Request
router.delete("/:id", deleteEmployee);

export default router;
