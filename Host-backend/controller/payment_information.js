const { PaymentInfo } = require("../models/payment_information");


const createPaymentInfo = async (req, res) => {
    console.log(req.body)
    const { cardNumber, e_date, cvc } = req.body
    const userId = req.userId
    let date = e_date.split('/')
    let data = {
        userId: userId,
        credit_card: {
            cardNumber: cardNumber,

            expiration_month: date[0].trim(),
            expiration_year: parseInt(date[1].trim()),
            cvc: parseInt(cvc)
        }
    }

    try {
        const payment_info = await PaymentInfo.findOneAndUpdate({ "userId": userId }, data, {
            new: true,
            upsert: true, // Make this update into an upsert
        })
        res.status(201).json(payment_info)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getPaymentInfo = async (req, res) => {
    const id = req.userId
    try {
        const payment_info = await PaymentInfo.findOne({ userId: id });
        
        res.status(200).json(payment_info)
    } catch (error) {
        res.status(201).json(error.message)
    }
}

const updatePaymentInfo = async (req, res) => {
    const id = req.params.id
    try {
        const payment_info = await PaymentInfo.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(payment_info)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports = { createPaymentInfo, getPaymentInfo, updatePaymentInfo }