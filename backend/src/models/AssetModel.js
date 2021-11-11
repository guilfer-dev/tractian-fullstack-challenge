import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema({

    name: {
        type: String,
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
        enum: ['Running', 'Alerting', 'Stopped']
    },
    healthLevel: {
        type: Number,
        min: 0,
        max: 100
    },

})

export default mongoose.model('Asset', AssetSchema);
export { AssetSchema };

