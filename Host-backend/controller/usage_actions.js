const { UsageActions } = require("../models/usage_actions");


const createPackages = async (req, res) => {
    try {
        const package = await UsageActions.create(req.body)
        res.status(201).json(package)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getPackages = async (req, res) => {

    try {
        const package = await UsageActions.find()

        res.status(200).json(package)
    } catch (error) {
        res.status(201).json(error.message)
    }
}
module.exports = { createPackages, getPackages }
