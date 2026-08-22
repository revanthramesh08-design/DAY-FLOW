const express = require('express');
const {
	applyLeave,
	getMyLeaves,
	getAllLeaves,
	approveLeave,
	rejectLeave
} = require('../controllers/leavecontrollers');

const router = express.Router();

router.post('/', applyLeave);
router.get('/my', getMyLeaves);
router.get('/all', getAllLeaves);
router.put('/:id/approve', approveLeave);
router.put('/:id/reject', rejectLeave);

module.exports = router;
