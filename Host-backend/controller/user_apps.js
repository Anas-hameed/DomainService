const { UserApps } = require("../models/user_apps");


const createApp = async (req, res) => {

    const { address_id, app_slug, pacakges_id } = req.body

    let data = {
        userId: req.userId,
        address_id: address_id,
        app_slug: app_slug,
        package_id: pacakges_id,
        is_payment: false,
        free_trial: true,
    }

    try {
        const user_info = await UserApps.create(data)
        res.status(201).json(user_info)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAppById = async (req, res) => {
    const id = req.userId
    console.log("req.query",req.query)
    const package_id = req.query.package_id
    try {
        const user_info = await UserApps.findOne({ userId: id, package_id: package_id });
        res.status(200).json(user_info)
    } catch (error) {
        res.status(201).json(error.message)
    }
}

const updateAppById = async (req, res) => {
    const id = req.params.id
    try {
        const user_info = await UserApps.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(user_info)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = { createApp, getAppById, updateAppById }