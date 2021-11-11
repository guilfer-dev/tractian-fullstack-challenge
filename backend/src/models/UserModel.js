import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    },

    acessTokern: {
        type: String,
        default: null
    },

    password: {
        type: String,
        required: true
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
})

export { UserSchema };
export default mongoose.model('User', UserSchema);