import mongoose, { Schema } from 'mongoose';
import { ICareGiver } from "../global"

// Define the schema
const careGiverSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        receivers: [{
            type: Schema.Types.ObjectId,
            ref: 'CareReceiver'
        }]

    },
    { timestamps: true }
)

// Save the schema as a model
const CareGiver = mongoose.model<ICareGiver>('CareGiver', careGiverSchema);

export default CareGiver