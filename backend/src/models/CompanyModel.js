import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true
    },
    units: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        unique: true
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }],
})

export default mongoose.model('Company', CompanySchema);
export { CompanySchema };