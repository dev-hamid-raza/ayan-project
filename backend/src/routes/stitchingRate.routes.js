import { Router } from "express";
import { createStitchingRate } from "../controllers/stitchingRate.controller.js";

const router = Router()

router.route('/create').post(createStitchingRate)

export default router