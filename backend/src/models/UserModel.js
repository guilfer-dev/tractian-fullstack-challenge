import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },

    loginID: {
        type: String,
        unique: true,
        required: true
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    }

})

export { UserSchema };
export default mongoose.model('User', UserSchema);