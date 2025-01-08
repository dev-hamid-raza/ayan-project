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
            .json(new ApiResponse(200,stitchingRate,))
})

const addArticleToStitchingRate = asyncHandler(async (req, res) => {
    const {article} = req.body
    const {stitchingRateId} = req.params
    if(!article) {
        throw new ApiError(400, 'Article is required')
    }
    const existingStitchingRate = await StitchingRate.findById(stitchingRateId)
    if(!existingStitchingRate) {
        throw new ApiError(404, 'Something went wrong')
    }
    const foundArticle = existingStitchingRate.articles.find((a) => {
        return a.articleName.toLowerCase() === article.toLowerCase()
    })
    if(foundArticle) {
        throw new ApiError('400', 'Article already exists')
    }
    const newArticle = {
        articleName: article,
        functions: []
    }
    existingStitchingRate.articles.push(newArticle)
    await existingStitchingRate.save()
    return res
            .status(201)
            .json(new ApiResponse(200,existingStitchingRate,'Successfully added new article'))
})

const addFunctionToStitchingRate = asyncHandler(async (req, res) => {
    const {article, functionName, functionRate} = req.body
    const {stitchingRateId} = req.params
    console.log(stitchingRateId)
    if(!article) {
        throw new ApiError(400, 'Article is required')
    }
    if(!functionName) {
        throw new ApiError(400, 'Function Name is required')
    }
    if(!functionRate) {
        throw new ApiError(400, 'Rate is required')
    }
    const existingStitchingRate = await StitchingRate.findById(stitchingRateId)
    if(!existingStitchingRate) {
        throw new ApiError(404, 'Something went wrong')
    }
    console.log(article)
    const foundArticle = existingStitchingRate.articles.find((a) => {
        return a.articleName.toLowerCase() === article.toLowerCase()
    })
    if(!foundArticle) {
        throw new ApiError('404', 'Article is not found')
    }
    foundArticle.functions.push({functionName,functionRate})
    existingStitchingRate.save()
    return res
            .status(201)
            .json(new ApiResponse(200,existingStitchingRate,'Successfully function added'))
})

export { 
    createStitchingRate,
    addArticleToStitchingRate,
    addFunctionToStitchingRate
}