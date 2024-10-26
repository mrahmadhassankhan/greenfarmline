const AsyncHandler = require("express-async-handler");
const OrderModel = require('../../Models/AdminModel/OrderModel');

const postorder = AsyncHandler(async (req, res) => {
    const { firstname, lastname, email, number, city, country, address, productname, description, quantity, price} = req.body;
    try {
        const existingOrder = await OrderModel.findOne({email});
        if (existingOrder) {
            return res.status(400).json({ error: "Email already exists" }); // Return a JSON object with an error message
        }
        await OrderModel.create({
            firstname, lastname, email, number, city, country, address, productname, description, quantity, price
        });
        res.status(201).json("Successfully Added order");
    } catch (error) {
        console.error("Error adding order:", error);
        res.status(500).json("Error adding order");
    }
});

const getorder = AsyncHandler(async (req, res) => {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
});

const deleteorder = AsyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const deletedorder = await OrderModel.findOneAndDelete(({ _id: orderId }));
        if (!deletedorder) {
            return res.status(404).json('Product not found');
        }
        res.status(200).json('Product deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json( 'Internal server error');
    }
});

module.exports = { postorder, getorder,deleteorder };
