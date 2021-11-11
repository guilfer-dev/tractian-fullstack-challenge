import User from "../models/UserModel.js";
import Company from "../models/CompanyModel.js";
import { compareData, hashData } from "../helpers/cripto.js"


export default {

    signup: async (req, res) => {

        const { name, password, company } = req.body;
        const user = await User.findOne({ name });
        const companyOnDB = await Company.findOne({ name: company });

        if (!name || !password) {
            res.status(404);
        } else if (user) {
            res.json({ message: "This user already exists." })
        }
        else if (!companyOnDB) {
            res.json({ message: "This company does not exist." })
        } else {
            User.create({
                name,
                password: await hashData(password),
                company: companyOnDB._id
            },
                (err, data) => {
                    if (err) {
                        res.json({
                            msg: "Unable to create user.",
                            err
                        })
                    } else {
                        companyOnDB.user = data._id;
                        companyOnDB.save();
                        res.json({
                            id: data._id,
                            name,
                            company: company.name
                        })
                    }
                })

        }
    },

    login: async (req, res) => { },

    reset: async (req, res) => { },

    logout: async (req, res) => { },
}