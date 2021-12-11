import dotenv from "dotenv";
import path from 'path';

dotenv.config({
    path: path.resolve(`./.env.${process.env.NODE_ENV}.local`)
});

const config = {
    PORT: process.env.PORT,
    MONGO_AUTH: process.env.MONGO_AUTH,
    JWT_SECRET: process.env.JWT_SECRET,
    S3_BUCKET: process.env.S3_BUCKET,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    MASTER_PW: process.env.MASTER_PW
}

export default config;