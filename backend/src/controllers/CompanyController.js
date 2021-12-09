import Company from "../models/CompanyModel.js";

export default {

    create: async (req, res) => {

        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Provide the name of the new company" });

        try {
            const companyInDB = await Company.findOne({ name });
            if (companyInDB) return res.status(400).json({ message: "This company already exists." });

            const company = await Company.create({ name });
            return res.json({
                _id: company._id,
                name
            })
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                err,
                msg: "Unable to create the company."
            });
        }
    },

    index: async (req, res) => {

        try {
            const companies = await Company.find({}).select("name")
            return res.json(companies);
        }
        catch (err) {
            return res.status(400).json({
                err,
                msg: "Unable to list companies."
            });
        }
    },

    show: async (req, res) => {

        const { id } = req.params;

        try {
            const company = await Company.findById(id)
                .populate("units", "name")
                .populate("users", "name");

            return res.json(company);
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({
                err,
                msg: "Unable to locate the company."
            });
        }
    },

    update: async (req, res) => {

        const { id } = req.params
        const { newName } = req.body

        if (!newName) return res.json({ msg: "Provide a new name" })

        try {
            const company = await Company.findById(id);

            if (company.name === newName) return res.json({ msg: "New name is the same as the previous." })

            company.name = newName;
            await company.save();
            return res.json({
                name: newName,
                msg: `Name of the company sucessfuly updated`
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                err,
                msg: "Unable to update the name of the company."
            });
        }
    },

    delete: async (req, res) => {

        const { id } = req.params

        try {
            await Company.findByIdAndRemove(id);
            return res.json("Company sucessfuly removed.");
        }
        catch {
            console.error(err)
            return res.status(500).json({
                err,
                msg: "Unable to locate the company."
            });
        }
    },
}