const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const leaveRoutes = require('./routes/leaveroutes');
const payrollRoutes = require('./routes/payrollroutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://praveenpragadeesh1814_db_user:mpa6KCWLYKeu44R6@cluster0.rjrdlt5.mongodb.net/dayflow?appName=Cluster0';

app.use(cors());
app.use(express.json());

app.use('/api/leaves', leaveRoutes);
app.use('/api/payroll', payrollRoutes);

// Start listening immediately
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Connect to MongoDB in the background
mongoose.connect(mongoUri)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
    });