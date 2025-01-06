import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { StitchingRate } from "../models/stitchingRate.model.js";
import { Party } from "../models/party.model.js";
import { PO } from "../models/PO.model.js";

const createStitchingRate = asyncHandler(async (req, res) => {
    const {partyName, poNumber} = req.body
    if(!partyName) {
        throw new ApiError(400, 'Party name is required')
    }
    if(!poNumber) {
        throw new ApiError(400, 'PO number is required')
    }
    const exitedPartyName = await Party.findOne({partyName})
    if(!exitedPartyName) {
        throw new ApiError(400, 'Party does not exits please create first')
    }
    const exitedPoNumber = await PO.findOne({poNumber})
    if(!exitedPoNumber) {
        throw new ApiError(400, 'This po is not exits first create it')
    }
    let stitchingRate = await StitchingRate.findOne({po:exitedPoNumber._id, partyName:exitedPartyName._id})
    if(!stitchingRate) {
        stitchingRate = new StitchingRate({
            partyName: exitedPartyName._id,
            po:exitedPoNumber._id,
            articles: []
        })
    }
    await stitchingRate.save()
    return res 
            .status(200)
            .json(new ApiResponse(200,stitchingRate))
})

export { createStitchingRate }