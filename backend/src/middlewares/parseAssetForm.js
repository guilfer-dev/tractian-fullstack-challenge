import fs from "fs";
import formidable from "formidable";

import S3FileUpload from "../helpers/S3FileUpload.js";

export default function upload(req, res, next) {

    const form = formidable({
        keepExtensions: true
    });

    form.parse(req, async (err, fields, files) => {
        if (!err) {
            const fileName = files.image.newFilename;
            const fileMime = files.image.mimetype;
            const fieExtension = fileMime.split('/')[1];

            if (fieExtension === 'jpg' ||
                fieExtension === 'jpeg' ||
                fieExtension === 'png') {

                if (req.method === "POST") {
                    if (Object.keys(fields).length < 6) return res.status(400).json({ msg: "All fields are required." });

                    req.fields = fields;
                    req.fields.image = fileName;
                }
                else if (req.method === "PUT") {

                    req.fields = fields;
                    req.fields.image = fileName;
                }

                const fileStream = fs.createReadStream(files.image.filepath);
                const uploadResult = await S3FileUpload(fileName, fileMime, fileStream);

                if (!uploadResult.err) {
                    next()
                } else {
                    res.status(500).json({
                        msg: "Failed to upload the image"
                    });
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