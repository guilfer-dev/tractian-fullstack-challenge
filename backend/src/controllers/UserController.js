import User from "../models/UserModel.js";
import Company from "../models/CompanyModel.js";

export default {

    create: async (req, res) => {

        const { name, company } = req.body;
        if (!name || !company) return res.status(400).json({ msg: "Name or company information is missing" });

        try {
            const userInDB = await User.findOne({ name });
            if (userInDB) return res.status(400).json({ msg: "This user already exists" });

            const companyInDB = await Company.findOne({ name: company })
            if (!companyInDB) return res.status(400).json({ msg: "This company does not exist" });

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
            console.error(err);
            return res.status(500).json({
                err,
                msg: "Unable to create user."
            });
        }
    },

    index: async (req, res) => {

        try {
            const users = await User.find({})
                .populate("company", "-users -units")
                .select("-accessToken");

            return res.json(users);
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({
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
            console.error(err);
            return res.status(400).json({
                err,
                msg: "Unable to locate the user."
            });
        }
    },

    update: async (req, res) => {

        const { id } = req.params;
        const { name } = req.body;

        try {
            const user = await User.findById(id)

            if (user.name === name) return res.status(400).json({ msg: "New name is the same as the previous." });

            user.name = name;
            await user.save();
            return res.json({
                name,
                msg: `Name of the user sucessfuly updated`
            });
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({
                err,
                msg: "Unable to locate the user."
            });
        }
    },
    delete: async (req, res) => {

        const { id } = req.params;

        try {
            await User.findByIdAndRemove(id);
            return res.json("User sucessfuly removed.");
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({
                err,
                msg: "Unable to locate the user."
            });
        }
    },
}