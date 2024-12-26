import { Router } from "express";
import { createPo } from "../controllers/po.controller.js";


const router = Router();   

router.route('/create').post(createPo);

export default router