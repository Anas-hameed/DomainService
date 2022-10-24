const { payment_history } = require("../models/payment_history");


const createPaymentHistory = async (req, res) => {
    try {
        const payment_hi = await payment_history.create(req.body)
        res.status(201).json(payment_hi)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getPaymentHistory = async (req, res) => {

    let id = req.userId
    try {
        const payment_hi = await payment_history.find({ "user_id": id });
        res.status(200).json(payment_hi)
    } catch (error) {
        res.status(201).json(error.message)
    }
}
module.exports = { createPaymentHistory, getPaymentHistory }
