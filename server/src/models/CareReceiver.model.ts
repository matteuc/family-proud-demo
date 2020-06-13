import mongoose, { Schema } from 'mongoose';
import { GlobalTypes } from "../global"
import CareGiver from "./CareGiver.model"

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
            required: true,
        }]
    },
    { timestamps: true }
)

// Save the schema as a model
const CareReceiver = mongoose.model<GlobalTypes.ICareReceiver>('CareReceiver', careReceiverSchema);

// Before deleting this document, remove the matching _id from all CareGiver documents
careReceiverSchema.pre('remove', function (next) {
    /**
     * For all CareGiver documents that contain this CareReceiver _id in their 'receivers' array, 
     * update 'receivers' by removing this._id 
     * */
    CareGiver.updateMany(
        {
            receivers: this._id
        },
        {
            $pullAll: {
                receivers: this._id
            }
        }, (err) => {
            if (err) next(err)

            else next();
        })
})

export default CareReceiver