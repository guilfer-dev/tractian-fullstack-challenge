import 'dotenv/config'

function validateMaster(req, res, next) {
    if (req.body.password === process.env.MASTER_PW) return next()

    return res.status(403).end();
}

export default validateMaster;