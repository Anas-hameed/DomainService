const { Marketplace } = require('../models/marketplaces')
const mongoose = require('mongoose')

// _id: mongoose.Types.ObjectId,


const createApp = async (req, res) => {
    console.log("runing")
    const { appdata, packagelist } = req.body
    let data = {
        ...appdata,
        packages: ''
    }

    if (packagelist && packagelist.length > 0) {
        let pdata = []
        for (let index = 0; index < packagelist.length; index++) {
            let element = packagelist[index]
            let det = {
                _id: mongoose.Types.ObjectId(),
                title: element.title,
                desc: element.desc,
                price: element.price,
                setup: element.setup

            }
            pdata.push(det)
        }
        data.packages = pdata
    }
    try {
        const marketplace = await Marketplace.create(data)

        res.status(201).json(marketplace)
    } catch (error) {
        console.log("rt", error.message)
        res.status(500).json(error.message)
    }
}

const getAppList = async (req, res) => {
    try {
        const marketplace = await Marketplace.find({}, { "name": 1, "slug": 1, "logo": 1, "sort_description": 1 })
        res.status(200).json(marketplace)
    } catch (error) {
        res.status(201).json(error.message)
    }
}


const getAppById = async (req, res) => {

    const slug = req.query.slug
    try {
        const marketplace = await Marketplace.findOne({ 'slug': slug });
        res.status(200).json(marketplace);

    } catch (error) {
        res.status(500).json(error);
    }
}

const getPackageById = async (req, res) => {

    const { appId, packageId } = req.query

    const slug = req.query.slug
    try {
        const marketplace = await Marketplace.findOne({ 'slug': appId }, { packages: 1 });

        res.status(200).json(marketplace);

    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { getAppList, getAppById, createApp, getPackageById }