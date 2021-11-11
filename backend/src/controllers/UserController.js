import User from "../models/UserModel.js";
import { compareData } from "../helpers/cripto.js"


export default {

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

        if (!newName) return res.json({ msg: "New name is required to this action." });

        try {
            const user = await User.findById(id);
            if (user.name === newName) {
                res.json({
                    msg: "New name is the same as the previous."
                });
            }
            else if (await compareData(password, user.password)) {
                user.name = newName;
                await user.save();
                res.json({
                    name: newName,
                    msg: `New user name sucessfuly updated`
                });
            } else {
                res.json({
                    msg: "Unable to update the name of the user."
                });
            }
        }
        catch (err) {
            console.log(err)
            res.json({
                msg: "Unable to update the name of the user."
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
                msg: "Unable to locate the company, try again later."
            });
        }
    },
}