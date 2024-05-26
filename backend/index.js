const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { message } = require('statuses');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.vzvo87j.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schemas
const sellerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  cycles: [{
    name: String,
    price: Number,
    pics: [String],
  }],
});

const buyerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  cyclesBought: [{
    name: String,
    price: Number,
    pics: [String],
    sellerName: String,
    sellerPhone: String
  }],
});

const Seller = mongoose.model('Seller', sellerSchema);
const Buyer = mongoose.model('Buyer', buyerSchema);

// Routes
app.post('/sell', async (req, res) => {
  try {
    const { name, phone, cycles } = req.body;
    const seller = await Seller.findOneAndUpdate({ phone }, { name, phone, cycles }, { upsert: true, new: true });
    res.status(201).json({ seller });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/cycles', async (req, res) => {
  try {
    const sellers = await Seller.find().select('name phone cycles');
    const allCycles = sellers.flatMap(seller => {
      return seller.cycles.map(cycle => ({
        sellerName: seller.name,
        sellerPhone: seller.phone,
        ...cycle.toObject()
      }));
    });
    res.status(200).json({ cycles: allCycles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/buy', async (req, res) => {
  try {
    const { buyerName, buyerPhone, cycleId } = req.body;

    // Find the seller and the cycle
    const seller = await Seller.findOne({ "cycles._id": cycleId });
    if (!seller) {
      return res.status(404).json({ error: 'Cycle not found' });
    }

    const cycle = seller.cycles.id(cycleId);

    // Find or create the buyer
    const buyer = await Buyer.findOneAndUpdate(
      { phone: buyerPhone },
      { name: buyerName, phone: buyerPhone },
      { upsert: true, new: true }
    );

    // Add cycle to buyer's bought cycles
    buyer.cyclesBought.push({
      name: cycle.name,
      price: cycle.price,
      pics: cycle.pics,
      sellerName: seller.name,
      sellerPhone: seller.phone
    });

    await buyer.save();

    res.status(200).json({ message: 'Cycle bought successfully', buyer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/seller/:sellerPhone/cycles', async (req, res) => {
  try {
    const { sellerPhone } = req.params;
    const seller = await Seller.findOne({ phone: sellerPhone }).select('cycles');
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    res.status(200).json({ cycles: seller.cycles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/buyer/:buyerPhone/cyclesBought', async (req, res) => {
  try {
    const { buyerPhone } = req.params;
    const buyer = await Buyer.findOne({ phone: buyerPhone }).populate('cyclesBought');
    if (!buyer) {
      return res.status(404).json({ error: 'Buyer not found' });
    }
    res.status(200).json({ cyclesBought: buyer.cyclesBought });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/sellers', async (req, res) => {
  try {
    const sellers = await Seller.find().select('name phone');
    res.status(200).json({ sellers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/buyers', async (req, res) => {
  try {
    const buyers = await Buyer.find().select('name phone');
    res.status(200).json({ buyers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
