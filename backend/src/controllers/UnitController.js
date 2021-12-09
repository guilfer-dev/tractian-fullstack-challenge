import Unit from "../models/UnitModel.js";
import Company from "../models/CompanyModel.js";


export default {

    create: async (req, res) => {

        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Provide the name of the new company" });

        const { companyName } = req.params;

        try {
            const [company] = await Company.find({ "name": companyName }).populate("units");

            const unitInDB = company.units.find(e => e.name === name);
            if (unitInDB) return res.status(400).json({ message: "This unit already exists in this company." });

            const unit = await Unit.create({ name, company: company._id });
            company.units.push(unit);
            await company.save();

            return res.json({
                _id: unit._id,
                name: unit.name,
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                err,
                msg: "Unable to create the unit."
            })
        }
    },

    index: async (req, res) => {

        try {
            const units = await Company.find({})
                .select("name units")
                .populate("units", "name");
            return res.json(units);
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({
                err,
                msg: "Unable to list units."
            });
        }
    },

    show: async (req, res) => {

        const { id } = req.params;

        try {
            const unit = await Unit.findById(id)
                .select("-__v")
                .populate("company", "name");

            if (!unit) return res.status(400).json({ msg: "This unit does not exist" });

            return res.json(unit);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                err,
                msg: "Unable to locate the company."
            })
        }
    },

    update: async (req, res) => {

        const { id } = req.params;
        const { newName } = req.body;

        try {
            const unit = await Unit.findById(id)

            if (unit.name === newName) return res.status(400).json({ msg: "New name is the same as the previous." });

            unit.name = newName;
            await unit.save();
            return res.json({
                name: newName,
                msg: `Name of the company sucessfuly updated`
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                err,
                msg: "Unable to update the name of the company."
            })
        }
    },

    delete: async (req, res) => {

        const { id } = req.params

        try {
            const unit = await Unit.findByIdAndDelete(id);
            if (!unit) return res.json("Unit does not exist.");

            const company = await Company.findById(unit.company);
            company.units.pull(id);
            await company.save();
            return res.json("Unit sucessfuly removed.");
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                err,
                msg: "Unable to delete the unit."
            });
        }
    },
}