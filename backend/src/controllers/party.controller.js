import mongoose from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse} from "../utils/ApiResponse.js"
import {Party} from "../models/party.model.js";

const createParty = asyncHandler(async (req, res) => {
    const partyName = req.body.partyName;
    if(!partyName) {
        throw new ApiError(400,'Party name is required')
    }
    const existingPartyName = await Party.findOne({partyName})
    if(existingPartyName) {
        throw new ApiError(400,'Party name already exits')
    }
    const newPartyName = await Party.create({partyName})
    if(!newPartyName) {
        throw new ApiError(500,'Something went wrong try again later')
    }
    return res
            .status(200)
            .json(new ApiResponse(201,newPartyName))
});


export {createParty};