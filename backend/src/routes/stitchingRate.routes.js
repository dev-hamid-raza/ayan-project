import { Router } from "express";
import { createStitchingRate,addArticleToStitchingRate, addFunctionToStitchingRate } from "../controllers/stitchingRate.controller.js";

const router = Router()

router.route('/create').post(createStitchingRate)
router.route('/create/article/:stitchingRateId').post(addArticleToStitchingRate)
router.route('/create/function/:stitchingRateId').post(addFunctionToStitchingRate)

export default router