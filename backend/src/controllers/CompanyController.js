import Company from "../models/CompanyModel.js";


export default {

    create: async (req, res) => {

        const { name } = req.body;
        if (!name) return res.json({ message: "Provide the name of the new company" });

        const companyInDB = await Company.findOne({ name });
        if (companyInDB) return res.json({ message: "This company already exists." });

        try {
            const company = await Company.create({ name });
            res.json(company)
        }
        catch (err) {
            res.json({
                err,
                msg: "Unable to create the company."
            })
        }
    },

    index: async (req, res) => {

        try {
            const companies = await Company.find({}).populate("users", "-password -company -__v");

            res.json(companies);
        }
        catch (err) {
            res.json({
                err,
                msg: "Unable to list companies."
            });
        }
    },

    show: async (req, res) => {

        const { id } = req.params

        Company.findById(id,
            (err, data) => {
                if (err) {
                    res.json({
                        err,
                        msg: "Unable to locate the company."
                    })
                } else {
                    res.json(data)
                }
            }).populate("users", "-password -company -__v")
    },

    update: async (req, res) => {

        const { id } = req.params
        const { newName } = req.body

        try {
            const company = await Company.findById(id);

            if (company.name === newName) {
                res.json({
                    err,
                    msg: "New name is the same as the previous."
                })
            } else {
                company.name = newName;
                await company.save();
                res.json({
                    name: newName,
                    msg: `Name of the company sucessfuly updated`
                });
            }
        }
        catch (err) {
            console.log(err)
            res.json({
                err,
                msg: "Unable to update the name of the company."
            })
        }
    },

    delete: async (req, res) => {

        const { id } = req.params

        Company.findByIdAndRemove(id,
            (err) => {
                if (err) {
                    res.json({
                        err,
                        msg: "Unable to locate the company."
                    })
                } else {
                    res.json("Company sucessfuly removed.")
                }
            })

    },
}