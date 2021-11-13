import Asset from "../models/AssetModel.js";
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

            const assetInDB = await Asset.findOne({ "name": fields.name });
            if (assetInDB) return res.json({ message: "This asset already exists in this unit." })

            req.fields = fields;
            req.fields.image = image;
            next();
        }
    })

}