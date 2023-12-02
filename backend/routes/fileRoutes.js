const express = require('express');
const multer = require('multer');

// multer configs
const { storage, fileFilter } = require('../util/MulterConfig');

const router = express.Router();
const upload = multer({ storage, fileFilter });

// fetching the controllers
const fileController = require('../controllers/fileController');

router.post(
	'/file-upload',
	upload.fields([
		{ name: 'profileImg', maxCount: 1 },
		{ name: 'resume', maxCount: 1 },
	]),
	fileController.handleFileUpload,
	fileController.responseForFileUpload
);

// router.post('/file-download', fileController.handleFileDownload);

module.exports = router;
