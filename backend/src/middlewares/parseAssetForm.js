import Asset from "../models/AssetModel.js";
import Unit from "../models/UnitModel.js";
import formidable from "formidable";

export default function upload(req, res, next) {

    let image;

    const form = formidable({
        keepExtensions: true
    });

    form.on("file", (field, file) => {
        image = file.newFilename;

    });

    form.parse(req, async (err, fields, files) => {
        if (!err) {
            if (req.method === "POST") {
                if (Object.keys(fields).length < 6) return res.json({ msg: "All fields are required." });

                try {
                    const { unitID } = req.params;
                    const assetInDB = await Asset.findOne({ "name": fields.name })
                        .where("unit").equals(unitID);

                    if (assetInDB) return res.json({ message: "This asset already exists in this unit." })
                    req.fields = fields;
                    req.fields.image = image;
                    next();
                }
                catch (e) {
                    return res.json({ message: "Invalid request." })
                }
            }
            else if (req.method === "PUT") {
                try {
                    const assetInDB = await Asset.findById(req.params.id);

                    if (!assetInDB) return res.json({ message: "This asset do not exists in this unit." })
                    req.fields = fields;
                    req.fields.image = image;
                    next();
                }
                catch (err) {
                    return res.json({ message: "Invalid request." })
                }
            }
        }
    })

}