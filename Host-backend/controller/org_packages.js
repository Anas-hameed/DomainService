const { org_packages } = require("../models/org_packages");


const createOrgPackages = async (req, res) => {
    try {
        const package = await org_packages.create(req.body)
        res.status(201).json(package)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getOrgPackagesList = async (req, res) => {
   
    try {
        const package = await org_packages.find()
        res.status(200).json(package)
    } catch (error) {
        res.status(201).json(error.message)
    }
}
module.exports = { createOrgPackages, getOrgPackagesList }
