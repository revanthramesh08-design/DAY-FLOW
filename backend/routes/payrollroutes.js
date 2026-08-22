const express = require('express');
const {
	generateSalary,
	getMyPayslips,
	getAllPayslips,
	updatePaymentStatus
} = require('../controllers/paycontroller');

const router = express.Router();

router.post('/', generateSalary);
router.get('/my', getMyPayslips);
router.get('/all', getAllPayslips);
router.put('/:id/pay', updatePaymentStatus);

module.exports = router;
