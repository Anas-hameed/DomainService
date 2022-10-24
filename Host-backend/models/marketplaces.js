const mongoose = require('mongoose')
const MarketplaceSchema = mongoose.Schema({
    slug: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    sort_description: {
        type: String,
        maxLength: 400,
        required: true
    },
    categorizes: {
        type: Array,
    },
    supported_languages: {
        type: Array,
    },
    developer_links: [
        {
            _id: mongoose.Types.ObjectId,
            title: String,
            link: String,

        },
    ],
    report_abuse: {
        type: String,

    },
    domain: {
        type: String,
        required: true,

    },
    descriptions: [
        {
            _id: mongoose.Types.ObjectId,

            title: String,
            desc: String,

        },
    ],
    customers: [
        {
            _id: mongoose.Types.ObjectId,
            image: String,
            link: String,

        },
    ],
    images: {
        type: Array,
        required: true,
    },
    packages: [
        {
            _id: mongoose.Types.ObjectId,
            title: String,
            desc: String,
            price: String,
            setup: Array

        },
    ],


})


const Marketplace = mongoose.model("marketplaces", MarketplaceSchema)

module.exports = { Marketplace }