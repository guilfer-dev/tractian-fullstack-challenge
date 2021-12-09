import User from "../models/UserModel.js";
import generateJwt from "../helpers/generateJwt.js";

export default {

    login: async (req, res) => {

        try {
            const { loginID } = req.body;

            if (!loginID) {
                return res.status(400).json({
                    msg: "Cannot authorize user"
                });
            }

            // find user by loginID
            const user = await User.findOne({ loginID })
                .select("name")
                .populate("company", "name");

            // erro if not found
            if (!user) return res.status(404).json({
                msg: "User not found",
            });


            // generate access token
            const { err, token } = generateJwt({ username: user.name });
            if (err) return res.status(500).json({
                msg: "Couldn't create access token. Please try again later",
            });

            user.accessToken = token;
            await user.save();

            // return 
            return res.send({
                msg: "User logged in successfully",
                token,
                company: user.company
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                err,
                msg: "Couldn't login. Please try again later.",
            });
        }
    },

    logout: async (req, res) => {
        try {

            const { username } = req.decoded;

            let user = await User.findOne({ name: username });
            user.accessToken = "";
            await user.save();

            return res.send({ success: true, msg: "User Logged out" });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                err,
                msg: err.message,
            });
        }
    },

    me: (req, res) => {
        return res.end();
    }
}