const { orgprofile } = require("../models/org_profiles");


const createOrUpdateOrgInfo = async (req, res) => {
    console.log("req.body", req.body)
    const { name, email, url, twitter_username, gravatar_email, billing_email, sponsors_email, location, logo } = req.body
    const userId = req.userId
    console.log("userId", userId)

    let data = {
        userId: userId,
        logo: logo,
        name: name,
        email: email,

        name: name,
        url: url,
        twitter_username: twitter_username,

        location: location,
        gravatar_email: gravatar_email,
        billing_email: billing_email,
        sponsors_email: sponsors_email,
    }

    try {
        const Org_profile = await orgprofile.findOneAndUpdate({ "userId": userId }, data, {
            new: true,
            upsert: true, // Make this update into an upsert
        })
        res.status(201).json(Org_profile)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getOrgInfo = async (req, res) => {
    const id = req.userId
    try {
        const Org_profile = await orgprofile.findOne({ userId: id });

        res.status(200).json(Org_profile)
    } catch (error) {
        res.status(201).json(error.message)
    }
}


module.exports = { getOrgInfo, createOrUpdateOrgInfo }