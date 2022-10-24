const { address } = require("../models/address");

const getAddressList = async (req, res) => {
    try {
        const Alladdress = await address.find()
        if (!Alladdress) {
            res.status(404).json({ message: "No address found" })

        } else {

            res.status(200).json(Alladdress)
        }

    } catch (error) {

        res.status(500).json(error)
    }
}
const getMyAddress = async (req, res) => {
    const userid = req.userId
    try {
        const Address = await address.find({ "userId": userid })
        if (!Address) {
            res.status(404).json({ message: "No address found" })
        } else {

            res.status(200).json(Address)
        }

    } catch (error) {

        res.status(500).json(error)
    }
}

const createAddress = async (req, res) => {
    let userId = req.userId
    const {
        firstName,
        lastName,
        address_1,
        address_2,
        city,
        postal_code,
        country,
        state
    } = req.body
    let data = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        address_1: address_1,
        address_2: address_2,
        city: city,
        postal_code: postal_code,
        country: country,
        state: state
    }
    try {
        const newAddress = await address.create(data)
        res.status(201).json(newAddress)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAddressById = async (req, res) => {
    const id = req.params.addressId
    try {
        const Address = await address.findById(id);
        res.status(200).json(Address);
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateAddressById = async (req, res) => {
    
    let userId = req.userId
    const {
        id,
        firstName,
        lastName,
        address_1,
        address_2,
        city,
        postal_code,
        country,
        state
    } = req.body
    let data = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        address_1: address_1,
        address_2: address_2,
        city: city,
        postal_code: postal_code,
        country: country,
        state: state
    }

    try {
        const Address = await address.findByIdAndUpdate(id, data, { new: true })
        res.status(200).json(Address)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deleteAddressById = async (req, res) => {
    const id = req.query.addressId
    try {
        await address.findByIdAndDelete(id)
        res.status(200).json("address deleted successfully")
    } catch (error) {
        res.status(500).json(error.message)
    }

}

module.exports = { getAddressList, getMyAddress, createAddress, getAddressById, updateAddressById, deleteAddressById }