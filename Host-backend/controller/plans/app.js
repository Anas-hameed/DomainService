const { App } =require("../../models/Plans/app")


const getAppPlans = async(req, res) =>{
    try {
        const apps = await App.find()
        res.status(200).json(apps)
       } catch (error) {
         res.status(500).json(error.message)
       }
}


module.exports = { getAppPlans }