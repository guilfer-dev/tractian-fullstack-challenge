import User from "../models/UserModel.js";
import Company from "../models/CompanyModel.js";
import { compareData } from "../helpers/cripto.js"


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
                .select("-password -__v")
                .populate("company", "-__v -users -units");

            res.json(users);
        }
        catch (err) {
            res.json({ msg: "Unable to list users." });
        }
    },

    show: async (req, res) => {

        const { id } = req.params

        try {
            const user = await User.findById(id)
                .select("-password -__v")
                .populate("company", "-__v -users -units");

            res.json(user);
        }
        catch (err) {
            res.json({
                err,
                msg: "Unable to locate the user."
            });
        }
    },

    update: async (req, res) => {

        const { id } = req.params
        const { newName, password } = req.body

        if (!newName) return res.json({ msg: "Provide the new name for the user." });

        try {
            const user = await User.findById(id);
            if (user.name === newName) {
                res.json({
                    msg: "New name is the same as previous."
                });
            }
            else if (await compareData(password, user.password)) {
                user.name = newName;
                await user.save();
                res.json({
                    name: newName,
                    msg: `User name sucessfuly updated`
                });
            } else {
                res.json({
                    msg: "Unable to change the name of the user."
                });
            }
        }
        catch (err) {
            console.log(err)
            res.json({
                msg: "Unable to change the name of the user."
            })
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
                msg: "Unable to locate the user."
            });
        }
    },
}