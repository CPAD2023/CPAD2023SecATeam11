const express = require('express');

const router = express.Router();

// fetching the controllers
const jobController = require('../controllers/jobController');

router.get('/getJobs', jobController.handleGetJobs);

router.post('/publishJob', jobController.handlePublishJob);

router.post('/applyJob', jobController.handleApplyJob);

router.post('/setJobInactive', jobController.handleSetInactive);

router.post('/deleteJob', jobController.handleDeleteJob);

module.exports = router;
