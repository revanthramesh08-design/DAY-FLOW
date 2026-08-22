const Payroll = require('../models/payroll');

const generateSalary = async (req, res) => {
    try {
        const {
            employee,
            month,
            year,
            basicSalary,
            deductions = 0
        } = req.body;

        if (!employee || !month || year == null || basicSalary == null) {
            return res.status(400).json({
                message: 'employee, month, year, and basicSalary are required'
            });
        }

        if (typeof basicSalary !== 'number' || typeof deductions !== 'number') {
            return res.status(400).json({
                message: 'basicSalary and deductions must be numbers'
            });
        }

        // Check if payroll already exists for this employee for the given month and year
        const existingPayroll = await Payroll.findOne({ employee, month, year });
        if (existingPayroll) {
            return res.status(400).json({
                message: `Payroll for ${month} ${year} already exists for this employee`
            });
        }

        const payroll = await Payroll.create({
            employee,
            month,
            year,
            basicSalary,
            deductions,
            netSalary: basicSalary - deductions
        });

        return res.status(201).json(payroll);
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to generate salary',
            error: error.message
        });
    }
};

const getMyPayslips = async (req, res) => {
    try {
        // req.user._id will be attached by your authentication middleware
        const payslips = await Payroll.find({ employee: req.user._id })
            .sort({ year: -1, createdAt: -1 });

        return res.status(200).json(payslips);
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch payslips',
            error: error.message
        });
    }
};

const getAllPayslips = async (req, res) => {
    try {
        // Populates employee details from the User collection
        const payslips = await Payroll.find()
            .populate('employee', 'name email department')
            .sort({ year: -1, createdAt: -1 });

        return res.status(200).json(payslips);
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch payslips',
            error: error.message
        });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const payroll = await Payroll.findByIdAndUpdate(
            req.params.id,
            {
                status: 'Paid',
                paymentDate: new Date()
            },
            { new: true, runValidators: true }
        );

        if (!payroll) {
            return res.status(404).json({ message: 'Payroll entry not found' });
        }

        return res.status(200).json(payroll);
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to update payment status',
            error: error.message
        });
    }
};

module.exports = {
    generateSalary,
    getMyPayslips,
    getAllPayslips,
    updatePaymentStatus
};