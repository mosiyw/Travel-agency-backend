const express = require("express");
const bodyParser = require("body-parser");
const { connectToDatabase } = require("./config/database"); // Import the connectToDatabase function
require("dotenv").config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to the database
connectToDatabase();

// Use environment variables
console.log("DB_URL:", process.env.DB_URL);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("ADMIN_JWT_SECRET:", process.env.ADMIN_JWT_SECRET);

// Require and use route files
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/admin", adminRoutes);

// ... Other app setup and route handling ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
