import express from "express";
import type { Router } from "express";
import { addJob } from "../controllers/jobController.js";
import { isLogedIn } from "../middleware/authMiddleware.js";

export const jobRouter:Router = express.Router()

jobRouter.get('/fetch',addJob)