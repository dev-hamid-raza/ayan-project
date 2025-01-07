import { Router } from "express";
import { createStitchingRate, addFunctionToStitchingRate } from "../controllers/stitchingRate.controller.js";

const router = Router()

router.route('/create').post(createStitchingRate)
router.route('/create/function/:stitchingRateId').post(addFunctionToStitchingRate)

export default router