import { S3 } from "@aws-sdk/client-s3";
import config from "../config.js"

const S3_BUCKET = config.S3_BUCKET;
const s3 = new S3({
    region: "sa-east-1"
});

async function S3FileRemove(fileName) {

    try {
        await s3.deleteObject({
            Bucket: S3_BUCKET,
            Key: fileName,
        });
        return {
            err: false,
            msg: "File remove sucessfully"
        }
    }
    catch (err) {
        console.error(err);
        return {
            err,
            msg: "Failed to remove file"
        };
    }
}

export default S3FileRemove