import fs from "fs";
import formidable from "formidable";

import S3FileUpload from "../helpers/S3FileUpload.js";

export default function upload(req, res, next) {

    const form = formidable({
        keepExtensions: true
    });

    form.parse(req, async (err, fields, files) => {

        if (err) {
            res.status(400).json({
                err,
                message: "Bad request"
            });
        } else if (req.method === "POST" &&
            Object.keys(fields).length < 6) {
            return res.status(400).json({ msg: "All fields are required." });
        } else {

            req.fields = fields;
            const file = {};

            if (files.image) {
                file.name = files.image.newFilename;
                file.mime = files.image.mimetype;
                file.extension = file.mime.split('/')[1];

                if (file.extension === 'jpg' ||
                    file.extension === 'jpeg' ||
                    file.extension === 'png') {

                    const fileStream = fs.createReadStream(files.image.filepath);
                    const uploadResult = await S3FileUpload(file.name, file.mime, fileStream);

                    if (uploadResult.err) {
                        return res.status(500).json({
                            msg: "Failed to upload the image"
                        });
                    }

                    req.fields.image = file.name;

                } else {
                    return res.status(400).json({
                        msg: "File type not allowed"
                    })
                }
            }

            return next()
        }
    })
}