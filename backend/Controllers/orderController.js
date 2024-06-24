import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
// import stripe from "stripe";

// Placing user order from frontend
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 80,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100 * 80,
            },
            quantity: 1,
        });

        // Uncomment and configure Stripe payment processing if required
        // const session = await stripe.checkout.sessions.create({
        //     payment_method_types: ["card"],
        //     line_items,
        //     mode: "payment",
        //     success_url: `${process.env.CLIENT_URL}/success`,
        //     cancel_url: `${process.env.CLIENT_URL}/cancel`,
        // });

        res.json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error placing order" });
    }
};

export { placeOrder };
