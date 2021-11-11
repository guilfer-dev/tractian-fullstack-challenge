import Asset from "../models/AssetModel.js";
import Company from "../models/CompanyModel.js";


export default {

    create: async (req, res) => {

        const { companyName, unitName } = req.params;
        const { name,
            image,
            description,
            model,
            owner,
            status,
            healthLevel } = req.body;
        if (!name) return res.json({ message: "Provide the name of the new company" });

        const assetInDB = await Company.findOne({ "units.assets.name": name });
        if (assetInDB) return res.json({ message: "This asset already exists in this unit." })

        try {
            const company = await Company.findOne({ "name": companyName });
            const [{ _id: unitId }] = company.units.filter(e => e.name === unitName);
            const asset = await Asset.create({
                name,
                image,
                description,
                model,
                owner,
                status,
                healthLevel,
                unit: unitId
            });

            company.units.id(unitId).assets.push(asset._id);
            await company.save();
            res.json(asset);
        }
        catch (err) {
            console.log(err);
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