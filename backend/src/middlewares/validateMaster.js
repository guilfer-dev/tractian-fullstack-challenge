import config from '../config.js'

function validateMaster(req, res, next) {
    if (req.body.password === config.MASTER_PW) return next()

    return res.status(403).end();
}

export default validateMaster;