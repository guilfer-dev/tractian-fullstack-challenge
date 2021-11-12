import User from "../models/UserModel.js";
import Company from "../models/CompanyModel.js";

export default {

    create: async (req, res) => {

        const { name, company } = req.body;
        if (!name || !company) return res.json({ message: "Name or company information is missing." });

        const user = await User.findOne({ name });
        if (user) return res.json({ message: "This user already exists." });

        const companyOnDB = await Company.findOne({ name: company });
        if (!companyOnDB) return res.json({ message: "This company does not exist." });

        try {
            const loginID = Math.random().toString(36).slice(2).toUpperCase();
            const user = User.create({
                name,
                loginID,
                company: companyOnDB._id
            });
            return res.json(user);

        }
        catch {
            return res.json({
                err,
                msg: "Unable to create user."
            });
        }
    },

    index: async (req, res) => {

        try {
            const users = await User.find({})
                .select("-loginID -companies -__v")

            return res.json(users);
        }
        catch (err) {
            return res.json({
                err,
                msg: "Unable to list users."
            });
        }
    },

    show: async (req, res) => {

        const { id } = req.params

        try {
            const user = await User.findById(id)
                .select("-loginID -companies -__v")

            return res.json(user);
        }
        catch (err) {
            return res.json({
                err,
                msg: "Unable to locate the user."
            });
        }
    },

    delete: async (req, res) => {

        const { id } = req.params;

        try {
            await User.findByIdAndRemove(id);
            res.json("User sucessfuly removed.");
        }
        catch (err) {
            res.json({
                err,
                msg: "Unable to locate the user."
            });
        }
    },
}