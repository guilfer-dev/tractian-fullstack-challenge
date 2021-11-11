import User from "../models/UserModel.js";
import Company from "../models/CompanyModel.js";
import { compareData, hashData } from "../helpers/cripto.js"


export default {

    index: async (req, res) => {

        try {
            const users = await User.find({}).select("-password -__v").populate("company", "-__v -users")

            res.json(users);
        }
        catch (err) {
            res.json({ msg: "Unable to list users now." });
        }
    },

    show: async (req, res) => {

        const { id } = req.params

        User.findById(id,
            (err, data) => {
                if (err) {
                    res.json({
                        msg: "Unable to locate the user."
                    })
                } else {
                    res.json({
                        _id: data._id,
                        name: data.name,
                        company: data.company

                    })
                }
            }).populate("company", "-__v -users")
    },

    update: async (req, res) => {

        const { id } = req.params
        const { newName, password } = req.body

        try {
            const user = await User.findById(id);

            if (user.name === newName) {
                res.json({
                    msg: "New name is the same as the previous."
                });
            } else if (await compareData(password, user.password)) {
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

        const { id } = req.params

        User.findByIdAndRemove(id,
            (err) => {
                if (err) {
                    res.json({
                        msg: "Unable to locate the company, try again later."
                    })
                } else {
                    res.json("User sucessfuly removed.")
                }
            })

    },
}