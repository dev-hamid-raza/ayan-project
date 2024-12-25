import mongoose from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse} from "../utils/ApiResponse.js"
import {Party} from "../models/party.model.js";

const createParty = asyncHandler(async (req, res) => {
    const partyName = req.body.partyName;
    const party = await Party.create({partyName});
    res.status(201).json(new ApiResponse(201, party));
});


export {createParty};