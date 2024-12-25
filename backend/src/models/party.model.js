import mongoose, {Schema} from "mongoose";

const partySchema = new Schema({ 
    partyName: { 
        type: String, 
        required: true, 
        unique: true },
    PO: [
        { 
        type: Schema.Types.ObjectId, 
        ref: 'PO' 
        }],
}, {timestamps: true});

export const Party = mongoose.model('Party', partySchema);