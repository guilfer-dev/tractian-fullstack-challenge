import User from "../models/UserModel.js";
import { compareData, hashData } from "../helpers/cripto.js"


export default {

    login: async (req, res) => {

        const { loginID } = req.body;

        if (!loginID) return res.json({ message: "No login ID informed." });

        try {
            const user = await User.findOne({ loginID })
                .select("-loginID -__v")
                .populate("companies", " - __v");

            if (!user) return res.json({ message: "Invalid login ID ." });
            else return res.json(user);

        }
        catch {
            return res.json({
                err,
                msg: "Unable to authorize user."
            });
        }
    }
}