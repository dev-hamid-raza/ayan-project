import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { PO } from "../models/PO.model.js";
import { Party } from "../models/party.model.js";
const createPo = asyncHandler(async (req, res) => {
        const {partyName, po} = req.body
        if(!partyName) {
            throw new ApiError(400,'Party name must required')
        }
        if(!po) {
            throw new ApiError(400,'PO number is required')
        }
        const party = await Party.findOne({partyName})
        if(!party) {
            throw new ApiError(400, 'This party is not exist')
        }
        const existingPo = await PO.findOne({po})
        if(existingPo) {
            throw new ApiError(400, 'Po already exits')
        }
        const partyId = party._id
        const createdPo = await PO.create({poNumber: po, partyName: partyId })
        if(!createdPo) {
            throw new ApiError(500, 'Internal server error please try again')
        }
        if(party.po.includes(createdPo._id)) {
            throw new ApiError(400,'Po already exits')
        }
        party.po.push(createdPo._id)
        await party.save()
        console.log(createdPo,party)
        return res 
                .status(201)
                .json(new ApiResponse(200,createdPo,'Po created successfully'))
})

const createArticle = asyncHandler(async (req, res) => {
    const {article, poNumber} = req.body
    if(!article) {
        throw new ApiError(400,'Article name is required')
    }
    if(!poNumber) {
        throw new ApiError(400,'PO Number is required')
    }
    const po = await PO.findOne({poNumber})
    if(!po) {
        throw new ApiError(404,'This PO is not exist')
    }
    if(po.articles.includes(article)) {
        throw new ApiError(400, 'Article is already exists')
    }
    po.articles.push(article)
    await po.save()
    return res
            .status(201)
            .json(new ApiResponse(200, po.articles, 'Article successfully created'))
})

export { 
    createPo,
    createArticle
}