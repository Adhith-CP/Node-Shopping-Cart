const mongoose = require('mongoose');

// Define a schema for your products
const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  imageURL: String,
});

// Create a Mongoose model using the schema
const Product = mongoose.model('Product', productSchema);

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your product data
const products = [
  {
    id: 1,
    title: "Samsung Galaxy S21",
    description: "The Samsung Galaxy S21 is a high-end smartphone with a powerful camera and fast performance.",
    price: 799.99,
    imageURL: "https://example.com/images/samsung_image.jpg",
  },
  {
    id: 2,
    title: "Apple iPhone 13",
    description: "The Apple iPhone 13 features the latest A15 Bionic chip and an impressive Super Retina XDR display.",
    price: 799.00,
    imageURL: "https://example.com/images/iphone_image.jpg",
  },
  // Add more product objects here
];

// Insert your product data
Product.insertMany(products, (err) => {
  if (err) {
    console.error('Error inserting products:', err);
  } else {
    console.log('Products inserted successfully.');
  }

  // Close the MongoDB connection
  mongoose.connection.close();
});
