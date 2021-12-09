import fs from "fs";
import formidable from "formidable";

import S3FileUpload from "../helpers/S3FileUpload.js";

export default function upload(req, res, next) {

    const form = formidable({
        keepExtensions: true
    });

    form.parse(req, async (err, fields, files) => {
        if (!err) {
            const fileMime = files.image.mimetype;
            const fieExtension = fileMime.split('/')[1];

            if (fieExtension === 'jpg' ||
                fieExtension === 'jpeg' ||
                fieExtension === 'png') {

                const fileName = files.image.newFilename;
                const fileStream = fs.createReadStream(files.image.filepath);

                const uploadResult = await S3FileUpload(fileName, fileMime, fileStream);

                if (!uploadResult.err) {
                    if (req.method === "POST") {
                        if (Object.keys(fields).length < 6) return res.json({ msg: "All fields are required." });

                        req.fields = fields;
                        req.fields.image = fileName;
                        next()
                    }
                    else if (req.method === "PUT") {

                        req.fields = fields;
                        req.fields.image = fileName;
                        next()
                    }
                }
            }
            else {
                res.status(400).json({
                    msg: "File type not allowed"
                });
            }
        } else {
            res.status(400).json({
                err,
                message: "Bad request"
            })
        }
    })
}