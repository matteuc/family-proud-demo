import mongoose, { Schema } from 'mongoose';
import { ICareReceiver } from "../global"

// Define the schema
const careReceiverSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        givers: [{
            type: Schema.Types.ObjectId,
            ref: 'CareGiver',
            required: true
        }]
    },
    { timestamps: true }
)

// Save the schema as a model
const CareReceiver = mongoose.model<ICareReceiver>('CareReceiver', careReceiverSchema);

export default CareReceiver