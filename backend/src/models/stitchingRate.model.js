import mongoose, {Schema} from "mongoose";

const functionSchema = new Schema({
    functionName: {
        type: String,
        required: true,
    },
    functionRate: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const articleSchema = new Schema({
    articleName: {
        type: String,
        required: true,
    },
    functions: [functionSchema]
}, {timestamps: true});

const stitchingRateSchema = new Schema({
    partyName: {
        type: Schema.Types.ObjectId,
        ref: 'Party',
    },
    po: {
        type: Schema.Types.ObjectId,
        ref: 'PO'
    },
    articles: [articleSchema]
},{timestamps: true});

export const StitchingRate = mongoose.model('StitchingRate', stitchingRateSchema);