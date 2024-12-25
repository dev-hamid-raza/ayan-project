import { Router } from "express";
import { createParty } from "../controllers/party.controller.js";


const router = Router();   

router.route('/create').post(createParty);

export default router