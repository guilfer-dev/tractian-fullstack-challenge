import { AssetSchema } from './AssetModel.js'
import mongoose from 'mongoose';

const UnitSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    asset: [AssetSchema]
})

export default mongoose.model('Unit', UnitSchema);
export { UnitSchema };