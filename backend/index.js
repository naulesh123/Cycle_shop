const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

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
  cyclesBought: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cycle',
  }],
});

const Seller = mongoose.model('Seller', sellerSchema);
const Buyer = mongoose.model('Buyer', buyerSchema);

// Routes
app.post('/sell', async (req, res) => {
  try {
    const { name, phone, cycles } = req.body;
    const seller = await Seller.create({ name, phone, cycles });
    res.status(201).json({ seller });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/cycles', async (req, res) => {
  try {
    const cycles = await Seller.find().select('name cycles');
    const allCycles = cycles.flatMap(seller => {
      return seller.cycles.map(cycle => ({
        sellerName: seller.name,
        ...cycle.toObject()
      }));
    });
    res.status(200).json({ cycles: allCycles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/buy/:sellerId/:cycleIndex', async (req, res) => {
  try {
    const { sellerId, cycleIndex } = req.params;
    const seller = await Seller.findById(sellerId);
    const cycle = seller.cycles[cycleIndex];

    // Assuming the buyer is already authenticated
    const buyer = await Buyer.findOne({ name: 'Buyer Name' });
    buyer.cyclesBought.push(cycle);
    await buyer.save();

    res.status(200).json({ message: 'Cycle bought successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/seller/:sellerId/cycles', async (req, res) => {
  try {
    const { sellerId } = req.params;
    const seller = await Seller.findById(sellerId).select('cycles');
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    res.status(200).json({ cycles: seller.cycles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/buyer/:buyerId/cyclesBought', async (req, res) => {
  try {
    const { buyerId } = req.params;
    const buyer = await Buyer.findById(buyerId).populate('cyclesBought');
    if (!buyer) {
      return res.status(404).json({ error: 'Buyer not found' });
    }
    res.status(200).json({ cyclesBought: buyer.cyclesBought });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
