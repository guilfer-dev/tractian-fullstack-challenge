
import { S3 } from "@aws-sdk/client-s3";
import "dotenv/config"

const S3_BUCKET = process.env.S3_BUCKET;
const s3 = new S3({
    region: "sa-east-1"
});

async function S3FileUpload(fileName, mimetype, fileStream) {

    try {
        await s3.putObject({
            Bucket: S3_BUCKET,
            Key: fileName,
            ContentType: mimetype,
            Body: fileStream,
            ACL: "public-read"
        });
        return {
            err: false,
            msg: "File created sucessfully"
        }
    } catch (err) {
        console.error(err);
        return {
            err,
            msg: "Failed to create file"
        };
    }
}

export default S3FileUpload;