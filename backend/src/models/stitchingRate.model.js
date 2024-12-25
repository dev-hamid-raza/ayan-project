import mongoose, {Schema} from "mongoose";

const functionSchema = new Schema({
    functionName: {
        type: String,
        required: true,
        unique: true
    },
    functionRate: {
        type: Number,
        required: true
    }
})

const articleSchema = new Schema({
    articleName: {
        type: String,
        required: true,
        unique: true
    },
    stitchingRate: [functionSchema]
});

const stitchingRateSchema = new Schema({
    partyName: {
        type: Schema.Types.ObjectId,
        ref: 'Party',
    },
    PO: {
        type: Schema.Types.ObjectId,
        ref: 'PO'
    },
    article: [articleSchema]
},{timestamps: true});

export const StitchingRate = mongoose.model('StitchingRate', stitchingRateSchema);