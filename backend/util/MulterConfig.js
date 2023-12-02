const multer = require('multer');
const UniqueSuffix = require('./UniqueSuffix');

exports.storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './resources/uploaded');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = UniqueSuffix();
		cb(null, file.fieldname + '-' + uniqueSuffix + '.json');
	},
});

exports.fileFilter = (req, file, cb) => {
	if (file.mimetype === 'application/json') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
