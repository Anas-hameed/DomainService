const { OS } = require('../../models/Plans/os')


const getOSPlans = async(req, res) =>{ 
    try {
        const allOS = await OS.find()
        res.status(200).json(allOS)
       } catch (error) {
         res.status(500).json(error.message)
       }
}


module.exports= { getOSPlans }