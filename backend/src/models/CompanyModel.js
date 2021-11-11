import { UnitSchema } from './UnitModel.js'
import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    units: [UnitSchema],
    users: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        unique: true
    }],
})

export default mongoose.model('Company', CompanySchema);
export { CompanySchema };