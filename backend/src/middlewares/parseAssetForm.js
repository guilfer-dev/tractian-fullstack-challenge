import Asset from "../models/AssetModel.js";
import Unit from "../models/UnitModel.js";
import formidable from "formidable";

export default function upload(req, res, next) {

    let image;

    const form = formidable({
        keepExtensions: true
    });

    form.on("file", (field, file) => {
        image = file.filepath;
    });

    form.parse(req, async (err, fields, files) => {
        if (!err) {
            if (Object.keys(fields).length < 6) return res.json({ msg: "All fields are required." });

            const { _id: unitId } = await Unit.findOne({ "name": req.params.unitName });
            const assetInDB = await Asset.findOne({ "name": fields.name }).where("unit").equals(unitId);

            console.log(unitId)
            console.log(assetInDB)

            if (assetInDB) return res.json({ message: "This asset already exists in this unit." })
            req.fields = fields;
            req.fields.image = image;
            next();
        }
    })

}