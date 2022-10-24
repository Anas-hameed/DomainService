const { userprofile } = require("../models/user_profiles");


const createOrUpdateUserInfo = async (req, res) => {
    console.log("req.body", req.body)
    const { bio, url, twitter_username, company, location, logo } = req.body
    const userId = req.userId
    console.log("userId", userId)

    let data = {
        logo: logo,
        userId: userId,
        bio: bio, url: url,
        twitter_username: twitter_username,
        company: company,
        location: location
    }

    try {
        const user_profile = await userprofile.findOneAndUpdate({ "userId": userId }, data, {
            new: true,
            upsert: true, // Make this update into an upsert
        })
        res.status(201).json(user_profile)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getUserInfo = async (req, res) => {
    const id = req.userId
    try {
        const user_profile = await userprofile.findOne({ userId: id });

        res.status(200).json(user_profile)
    } catch (error) {
        res.status(201).json(error.message)
    }
}


module.exports = { getUserInfo, createOrUpdateUserInfo }