const express = require('express');
const router = express.Router();
const {
    generateSalary,
    getMyPayslips,
    getAllPayslips,
    updatePaymentStatus
} = require('../controllers/paycontroller');

// Admin/HR endpoints
router.post('/generate', generateSalary);
router.get('/all', getAllPayslips);
router.put('/pay/:id', updatePaymentStatus);

// Employee logged-in endpoint (Requires auth middleware)
router.get('/my-payslips', getMyPayslips);

module.exports = router;