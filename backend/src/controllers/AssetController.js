import Asset from "../models/AssetModel.js";
import Unit from "../models/UnitModel.js";

export default {

    create: async (req, res) => {

        const { unitID } = req.params;

        const { name,
            image,
            description,
            model,
            owner,
            status,
            healthLevel } = req.fields;

        try {
            const unit = await Unit.findById(unitID);
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
            console.error(err);
            return res.json({
                err,
                msg: "Unable to create the unit."
            })
        }
    },

    index: async (req, res) => {

        const { unitID } = req.params
        try {
            const assets = await Asset.find({})
                .where("unit").equals(unitID)
                .select("-__v")
                .populate("unit", "-assets -__v");
            return res.json(assets);
        }
        catch (err) {
            console.error(err);
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
            console.error(err);
            return res.json({
                err,
                msg: "Unable to locate the company."
            })
        }
    },

    update: async (req, res) => {


        try {
            const asset = await Asset.findByIdAndUpdate(req.params.id, req.fields)

            if (!asset) return res.json("Asset does not exist.");

            return res.json({
                msg: `Asset sucessfuly updated`
            });

        }
        catch (err) {
            console.error(err);
            return res.json({
                err,
                msg: "Unable to update the asset."
            })
        }
    },

    delete: async (req, res) => {

        const { id } = req.params

        try {
            const asset = await Asset.findByIdAndDelete(id)
            if (!asset) return res.json("Asset does not exist.");

            const unit = await Unit.findById(asset.unit);
            unit.assets.pull(id);
            await unit.save();
            return res.json("Asset sucessfuly removed.");
        }
        catch (err) {
            console.error(err);
            return res.json({
                err,
                msg: "Unable to delete the asset."
            });
        }
    },
}