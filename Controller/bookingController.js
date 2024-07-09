const booking = require('../Model/bookingModel');

// Add booking
exports.addProductBooking = async (req, res) => {
    const {
        cart,addressName,addressHouse,addressStreet,addressPlace,addressPin,addressPhone,grandTotal,bookingTime,userId,bookedMonth,bookedYear} = req.body;

           if (!cart || !addressName || !addressHouse || !addressStreet || !addressPlace || !addressPin || !addressPhone || !grandTotal || !bookingTime || !userId || !bookedMonth || !bookedYear) {
            res.status(400).json({ error: "Missing  Booking Details"});
            }
            try {
                const newBooking = new booking({
                    cart,addressName,addressHouse,addressStreet,addressPlace,addressPin,addressPhone,grandTotal,bookingTime,userId,bookedMonth,bookedYear
                });

                await newBooking.save();
                res.status(200).json(newBooking);
            } catch (error) {
                console.error('Booking Error:', error);
                if (!res.headersSent) {
                  res.status(500).json({ error: 'Server error' });
                }
            }
}


//get users all bookings
exports.getUsersBooking=async(req,res)=>{
    try {
        const  userId=req.payload
        const result=await booking.find({userId})
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error)
    }
}

//get all bookings
exports.getAllBooking=async(req,res)=>{
    try {
        const result=await booking.find()
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error)
    }
}
