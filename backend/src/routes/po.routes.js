import { Router } from "express";
import { createPo, createArticle } from "../controllers/po.controller.js";


const router = Router();   

router.route('/create').post(createPo);
router.route('/createArticle').post(createArticle);

export default router