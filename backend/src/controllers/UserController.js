import User from "../models/UserModel.js";
import Company from "../models/CompanyModel.js";

export default {

    create: async (req, res) => {

        const { name, company } = req.body;
        if (!name || !company) return res.json({ message: "Name or company information is missing." });

        try {
            const userInDB = await User.findOne({ name });
            if (userInDB) return res.json({ message: "This user already exists." });

            const companyInDB = await Company.findOne({ name: company })
            if (!companyInDB) return res.json({ message: "This company does not exist." });

            const loginID = Math.random().toString(36).slice(2).toUpperCase();

            const user = await User.create({
                name,
                loginID,
                company: companyInDB._id
            })
            companyInDB.users.push(user);
            await companyInDB.save();
            return res.json({
                _id: user._id,
                loginID,
                name,
                company
            });
        }
        catch (err) {
            console.log(err);
            return res.json({
                err,
                msg: "Unable to create user."
            });
        }
    },

    index: async (req, res) => {

        try {
            const users = await User.find({})
                .select("name")
                .populate("company", "name")

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
                .select("-__v")
                .populate("company", "name")

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