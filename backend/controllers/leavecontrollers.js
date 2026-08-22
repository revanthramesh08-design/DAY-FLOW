const Leave = require('../models/leave');

const applyLeave = async (req, res) => {
	try {
		const {
			employeeId,
			leaveType,
			startDate,
			endDate,
			remarks
		} = req.body;

		if (!employeeId || !leaveType || !startDate || !endDate || !remarks) {
			return res.status(400).json({
				message: 'employeeId, leaveType, startDate, endDate, and remarks are required'
			});
		}

		const leave = await Leave.create({
			employeeId,
			leaveType,
			startDate,
			endDate,
			remarks,
			status: 'Pending'
		});

		return res.status(201).json(leave);
	} catch (error) {
		return res.status(500).json({
			message: 'Failed to apply for leave',
			error: error.message
		});
	}
};

const getMyLeaves = async (req, res) => {
	try {
		// TODO: Replace this temporary source with req.user.employeeId after authentication is added.
		const employeeId = req.user?.employeeId || req.params.employeeId || req.query.employeeId;

		if (!employeeId) {
			return res.status(400).json({
				message: 'employeeId is required until authentication middleware is connected'
			});
		}

		const leaves = await Leave.find({ employeeId }).sort({ createdAt: -1 });
		return res.status(200).json(leaves);
	} catch (error) {
		return res.status(500).json({
			message: 'Failed to fetch employee leaves',
			error: error.message
		});
	}
};

const getAllLeaves = async (req, res) => {
	try {
		const leaves = await Leave.find().sort({ createdAt: -1 });
		return res.status(200).json(leaves);
	} catch (error) {
		return res.status(500).json({
			message: 'Failed to fetch leaves',
			error: error.message
		});
	}
};

const updateLeaveStatus = async (req, res, status) => {
	const { adminComment } = req.body;
	const leave = await Leave.findByIdAndUpdate(
		req.params.id,
		{ status, adminComment },
		{ new: true, runValidators: true }
	);

	if (!leave) {
		return res.status(404).json({ message: 'Leave request not found' });
	}

	return res.status(200).json(leave);
};

const approveLeave = async (req, res) => {
	try {
		return await updateLeaveStatus(req, res, 'Approved');
	} catch (error) {
		return res.status(500).json({
			message: 'Failed to approve leave',
			error: error.message
		});
	}
};

const rejectLeave = async (req, res) => {
	try {
		return await updateLeaveStatus(req, res, 'Rejected');
	} catch (error) {
		return res.status(500).json({
			message: 'Failed to reject leave',
			error: error.message
		});
	}
};

module.exports = {
	applyLeave,
	getMyLeaves,
	getAllLeaves,
	approveLeave,
	rejectLeave
};
