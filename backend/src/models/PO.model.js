import mongoose, {Schema} from "mongoose";

const poSchema = new Schema({
    poNumber: {
        type: String,
        required: true,
        unique: true
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


export const PO = mongoose.Model('PO', poSchema)