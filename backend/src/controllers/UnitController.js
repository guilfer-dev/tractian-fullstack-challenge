import Unit from "../models/UnitModel.js";
import Company from "../models/CompanyModel.js";


export default {

    create: async (req, res) => {

        const { name } = req.body;
        if (!name) return res.status(404);

        const unitInDB = await Company.find({ "units.name": name });
        if (unitInDB[0]) return res.json({ message: "This unit already exists in this company." })

        try {
            const company = await Company.findById(req.params.companyId);
            const unit = new Unit({ name });
            company.units.push(unit);
            await company.save();
            res.json({
                _id: unit._id,
                name: unit.name
            });
        }
        catch (err) {
            res.json({
                err,
                msg: "Unable to create the unit."
            })
        }
    },

    index: async (req, res) => {

        try {
            const units = await Company.find({}).select("name units");
            res.json(units);
        }
        catch (err) {
            res.json({
                err,
                msg: "Unable to list units."
            });
        }
    },

    show: async (req, res) => {

        const { id } = req.params;

        try {
            const company = await Company.findOne({ "units._id": id });
            res.json(await company.units.id(id))
        }
        catch (err) {
            res.json({
                err,
                msg: "Unable to locate the company."
            })
        }
    },

    update: async (req, res) => {

        const { id } = req.params;
        const { newName } = req.body;

        try {
            const company = await Company.findOne({ "units._id": id });
            const unit = await company.units.id(id);

            if (unit.name === newName) {
                res.json({ msg: "New name is the same as the previous." })
            }
            else {
                unit.name = newName;
                await unit.save();
                res.json({
                    name: newName,
                    msg: `Name of the company sucessfuly updated`
                });
            }
        }
        catch (err) {
            console.log(err)
            res.json({
                err,
                msg: "Unable to update the name of the company."
            })
        }
    },

    delete: async (req, res) => {

        const { id } = req.params

        try {
            const company = await Company.findOne({ "units._id": id });
            if (!company) {
                return res.json("Unit does not exist.");
            }
            else {
                company.units.id(id).remove();
                company.save();
                res.json("Unit sucessfuly removed.");
            }
        }
        catch (err) {
            res.json({
                err,
                msg: "Unable to delete the unit."
            });
        }
    },
}