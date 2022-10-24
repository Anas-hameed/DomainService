const { packages } = require("../models/packages");


const createPackages = async (req, res) => {
    try {
        const package = await packages.create(req.body)
        res.status(201).json(package)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getPackagesList = async (req, res) => {
   
    try {
        const package = await packages.find()

        res.status(200).json(package)
    } catch (error) {
        res.status(201).json(error.message)
    }
}
module.exports = { createPackages, getPackagesList }
