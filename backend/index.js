const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = ['http://localhost:5173'];
const options = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods:["POST","GET"],
};

app.use(cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.vzvo87j.mongodb.net/', {
  // Removed deprecated options
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
    sellerPhone: String,
  }],
});

const Seller = mongoose.model('Seller', sellerSchema);
const Buyer = mongoose.model('Buyer', buyerSchema);

// Multer storage //
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.get('/', (req, res) => {
  res.send('Backend API is runningsss');
});

app.post('/sell', upload.array('pics', 12), async (req, res) => {
  try {
    const { name, phone, title, description, price } = req.body;
    const pics = req.files.map(file => file.filename); // Only the filenames

    const newCycle = {
      name: title,
      price: price,
      pics,
    };

    const seller = await Seller.findOneAndUpdate(
      { phone },
      { name, phone, $push: { cycles: newCycle } },
      { upsert: true, new: true }
    );

    res.status(201).json({ seller });
  } catch (error) {
    console.error('Error saving data:', error);
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
    res.status(200).json(allCycles); // Adjusted to return the array directly
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/delete', async (req, res) => {
  try {
    const { _id, phone } = req.body;

    const result = await Seller.findOneAndUpdate(
      { phone: phone },
      { $pull: { cycles: { _id: _id } } },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ error: 'Seller or cycle not found' });
    }

    res.send({ message: 'Cycle removed successfully', result });
  } catch (error) {
    res.status(500).send({ error: 'An error occurred', details: error.message });
  }
});

app.post('/change', upload.array('pics', 12), async (req, res) => {
  try {
    const { new_name, new_phone, new_title, description, new_price, user_id } = req.body;
    const pics = req.files.map(file => file.filename); // Extract filenames from uploaded files

    const newCycle = {
      name: new_title,
      price: new_price,
      pics
    };

    // First, pull the existing cycle by user_id
    const del = await Seller.findOneAndUpdate(
      { phone: new_phone },
      { $pull: { cycles: { _id: user_id } } },
      { new: true }
    );

    if (!del) {
      return res.status(404).send({ error: 'Seller or cycle not found' });
    }

    // Then, push the new cycle
    const changed = await Seller.findOneAndUpdate(
      { phone: new_phone },
      { $push: { cycles: newCycle }, name: new_name },
      { new: true }
    );

    res.send(changed);
  } catch (e) {
    console.error('Error updating data:', e);
    res.status(500).send({ error: 'An error occurred', details: e.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
