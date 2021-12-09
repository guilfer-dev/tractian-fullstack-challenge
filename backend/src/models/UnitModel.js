import mongoose from 'mongoose';

const UnitSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    assets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
    }],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
})

export default mongoose.model('Unit', UnitSchema);
export { UnitSchema };