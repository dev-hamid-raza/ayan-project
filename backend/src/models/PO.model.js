import mongoose, {Schema} from "mongoose";

const poSchema = new Schema({
    poNumber: {
        type: String,
    },
    partyName: {
        type: Schema.Types.ObjectId,
        ref: 'Party'
    },
    stitchingRate: {
        type:Schema.Types.ObjectId,
        ref: 'StitchingRate'
    }
}, {timestamps: true});


export const PO = mongoose.model('PO', poSchema)