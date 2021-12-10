import Company from "../models/CompanyModel.js";
import Asset from "../models/AssetModel.js";

export default {
    index: async (req, res) => {

        const { companyID } = req.params

        try {
            const companyInDB = await Company.findById(companyID)
                .select("units")

            if (!companyInDB) return res.status(400).json({ msg: "Company not found" })

            const assets = [];

            for (let unit in companyInDB.units) {
                const [unitAssets] = await Asset.find({})
                    .where("unit").equals(companyInDB.units[unit])
                    .select("-__v")
                if (unitAssets) assets.push(unitAssets);
            }

            return res.json(assets);
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({
                err,
                msg: "Unable to list units."
            });
        }
    },
}