import mongoose, { Schema } from 'mongoose';
import { GlobalTypes } from "../global"
import CareReceiver from "./CareReceiver.model"

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
const CareGiver = mongoose.model<GlobalTypes.ICareGiver>('CareGiver', careGiverSchema);

// Before deleting this document, remove the matching _id from all CareReceiver documents
careGiverSchema.pre('remove', function (next) {
    /**
     * For all CareReceiver documents that contain this CareGiver _id in their 'givers' array, 
     * update 'givers' by removing this._id 
     * */
    CareReceiver.updateMany(
        {
            givers: this._id
        },
        {
            $pullAll: {
                givers: this._id
            }
        }, (err) => {
            if (err) next(err)

            else next();
        })
})

export default CareGiver