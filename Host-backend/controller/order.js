const { order } =require('../models/order')



const  createOrder = async (req, res)=>{
    try {
        const Order = await  new order(req.body)
        console.log(Order)
       const newOrder = await Order.save();
        res.status(201).json(newOrder)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const  getOrderList = async (req, res) =>{
    try {
        const orders = await order.find()
        res.status(200).json(orders)
     } catch (error) {
         res.status(201).json(error.message)
     }
}


const getOrderById = async (req, res) =>{
    const id = req.params.id
    try {
        const singleOrder = await order.findById(id);
        res.status(200).json(singleOrder) ;
    } catch (error) {
        res.status(500).json(error) ;
    }
}




module.exports = {getOrderList, getOrderById, createOrder}