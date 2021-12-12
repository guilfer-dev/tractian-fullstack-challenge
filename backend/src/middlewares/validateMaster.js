import config from '../config.js'

function validateMaster(req, res, next) {

    const authorization = Buffer
        .from(req.headers.authorization.split(" ")[1], "base64")
        .toString()
        .replace(":", "");

    if (authorization === config.MASTER_PW) return next()

    return res.status(403).end();
}

export default validateMaster;