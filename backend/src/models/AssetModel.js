import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    status: {
        type: String,
        lowercase: true,
        enum: ['running', 'alerting', 'stopped'],
        required: true
    },
    healthLevel: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    }

})

export default mongoose.model('Asset', AssetSchema);
export { AssetSchema };

