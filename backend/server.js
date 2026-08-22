const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const leaveRoutes = require('./routes/leaveroutes');
const payrollRoutes = require('./routes/payrollroutes');

dotenv.config();

const app = express();
const port = 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dayflow';

app.use(cors());
app.use(express.json());

app.use('/api/leaves', leaveRoutes);
app.use('/api/payroll', payrollRoutes);

mongoose.connect(mongoUri)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});
	})
	.catch((error) => {
		console.error('MongoDB connection failed:', error.message);
		process.exit(1);
	});
