import mongoose from 'mongoose';

// Define the schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        }
    },
    { timestamps: true }
)

// Save the schema as a model
const User = mongoose.model('User', userSchema);

export default User