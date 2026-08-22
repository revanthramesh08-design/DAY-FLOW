const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
	employeeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Employee',
		required: true
	},
	leaveType: {
		type: String,
		enum: ['Paid', 'Sick', 'Unpaid'],
		required: true
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	remarks: {
		type: String,
		trim: true
	},
	status: {
		type: String,
		enum: ['Pending', 'Approved', 'Rejected'],
		default: 'Pending'
	},
	adminComment: {
		type: String,
		trim: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Leave', leaveSchema);
