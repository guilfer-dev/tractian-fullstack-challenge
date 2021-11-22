import Asset from "../models/AssetModel.js";
import Unit from "../models/UnitModel.js";

export default {

    create: async (req, res) => {

        const { unitName } = req.params;

        const { name,
            image,
            description,
            model,
            owner,
            status,
            healthLevel } = req.fields;

        try {
            const unit = await Unit.findOne({ "name": unitName });
            const asset = await Asset.create({
                name,
                imagePath: image,
                description,
                model,
                owner,
                status,
                healthLevel,
                unit: unit._id
            });

            unit.assets.push(asset._id);
            await unit.save();
            return res.json(asset);
        }
        catch (err) {
            return res.json({
                err,
                msg: "Unable to create the unit."
            })
        }
    },

    index: async (req, res) => {

        try {
            const assets = await Asset.find({})
                .select("-__v")
                .populate("unit", "-assets -__v");
            return res.json(assets);
        }
        catch (err) {
            return res.json({
                err,
                msg: "Unable to list units."
            });
        }
    },

    show: async (req, res) => {

        const { id } = req.params;

        try {
            const assets = await Asset.findById(id)
                .select("-__v")
                .populate("unit", "-assets -__v")
            return res.json(assets)
        }
        catch (err) {
            console.log(err);
            return res.json({
                err,
                msg: "Unable to locate the company."
            })
        }
    },

    update: async (req, res) => {

        const { id } = req.params;

        const { newName } = req.body;
        if (!newName) return res.json("New name is required.");

        try {
            const asset = await Asset.findById(id)

            if (asset.name === newName) return res.json({ msg: "New name is the same as the previous." });

            asset.name = newName;
            await asset.save();
            return res.json({
                name: newName,
                msg: `Name of the company sucessfuly updated`
            });

        }
        catch (err) {
            return res.json({
                err,
                msg: "Unable to update the name of the company."
            })
        }
    },

    delete: async (req, res) => {

        const { id } = req.params

        try {
            const asset = await Asset.findByIdAndDelete(id)
            if (!asset) return res.json("Unit does not exist.");

            const unit = await Unit.findById(asset.unit);
            unit.assets.pull(id);
            await unit.save();
            return res.json("Unit sucessfuly removed.");
        }
        catch (err) {
            console.log(err);
            return res.json({
                err,
                msg: "Unable to delete the unit."
            });
        }
    },
}