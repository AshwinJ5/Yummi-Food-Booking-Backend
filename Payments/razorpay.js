const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.razorpayPayment = async (req, res) => {
  const { amount, currency, receipt } = req.body;
  try {
    const order = await razorpay.orders.create({ amount, currency, receipt });
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    if (error.statusCode) {
      res.status(error.statusCode).send({ error: error.error });
    } else {
      res.status(500).send({ error: "Failed to create Razorpay order" });
    }
  }
};
