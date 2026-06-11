import express from "express";

import {
  getRecommendations,
  getAdvice,
} from "../controllers/aiController.js";

const router = express.Router();

router.get(
  "/recommendations",
  getRecommendations
);

router.get(
  "/deal-advice",
  getAdvice
);

export default router;