const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/router");
const jobListingRoutes = require('./routes/api/jobListing');
const app = express();
const careerRoutes = require('./routes/api/careerRoutes');
const jobRoutes = require('./routes/api/jobRoute');
const adminRoutes = require('./routes/api/adminRoutes'); // Make sure to import adminRoutes
const quotationsRouter = require('./routes/api/appDevQuotationRoutes');
// MongoDB connection
mongoose
  .connect('mongodb://127.0.0.1:27017/secufleet')
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Error connecting to MongoDB!", err));

// Middleware Section
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const allowedOrigins = ['http://localhost:5500', 'http://192.168.0.110:3001'];

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: false,  // If you're sending cookies or authorization headers
// }));
 // Assuming you have a route file for quotations

app.use('/api', quotationsRouter);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
// Add additional middleware as needed

// Routes
app.use(router);
app.use('/api', careerRoutes);
// app.js or server.js
app.use('/api', jobRoutes);
app.use('/api/jobListing', jobListingRoutes);
app.use('/api', adminRoutes);
// Error handling middleware (global)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
const quotationRoutes = require('./routes/api/quotation');
app.use('/api/quotations', quotationRoutes);
// app.js or server.js
const fleetQuotationRoutes = require('./routes/api/fleetQuotation');

app.use('/api/fleetQuotations', fleetQuotationRoutes);

// Start the server
const startApp = async () => {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error(`Error while starting application: ${error}`);
  }
};

startApp();
