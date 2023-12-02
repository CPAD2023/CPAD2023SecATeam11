const multer = require('multer');
const fs = require('fs');
const DBUtility = require('../util/DBUtility');
const path = require('path');
const UniqueSuffix = require('../util/UniqueSuffix');

exports.handleFileUpload = async (req, res, next) => {
	try {
		if (req.files == undefined || Object.keys(req.files).length < 1) {
			throw new Error('Config files missing in request');
		}
		fileType = req.body.fileType;
	} catch (err) {
		console.log(err.message);
		return res.status(400).send('Invalid request payload');
	}
	try {
		const instanceFilePath = req.files.instanceFile[0].path;
		let obj = null;
		let bindedFilePaths = null;
		if (instanceFilePath != undefined) {
			parsedInstanceFile = await JSON.parse(
				fs.readFileSync(instanceFilePath, 'utf8')
			);
		} else {
			throw new Error();
		}
		if (fileType != 'DRM') {
			bindedFilePaths =
				req.files.bindedFiles != undefined
					? req.files.bindedFiles.map((file) => file.path)
					: null;
			if (bindedFilePaths != null) {
				const parsedBindedFiles = await getParsedBindedFiles(
					bindedFilePaths
				);
				obj = {
					bindedFiles: parsedBindedFiles,
				};
			}
		}
		req.parsedFiles =
			bindedFilePaths == null
				? {
						instanceFile: parsedInstanceFile,
				  }
				: {
						...obj,
						instanceFile: parsedInstanceFile,
				  };
		const fileNames =
			bindedFilePaths == null
				? stringifyFileNames(instanceFilePath, null)
				: stringifyFileNames(instanceFilePath, bindedFilePaths);
		req.fileNames = fileNames;
		next();
	} catch (err) {
		console.log(err);
		return res.status(500).send('Error in reading the files');
	}
};

async function getParsedBindedFiles(bindedFilePaths) {
	let parsedBindedFiles = [];
	for (let i = 0; i < bindedFilePaths.length; i++) {
		parsedBindedFiles.push(
			await JSON.parse(fs.readFileSync(bindedFilePaths[i], 'utf-8'))
		);
	}
	return parsedBindedFiles;
}

function stringifyFileNames(instanceFilePath, bindedFilePaths) {
	let fileNamesString = '';
	if (process.env.ENV == 'DEV') {
		fileNamesString = fileNamesString + instanceFilePath.split('\\')[2];
	} else if (process.env.ENV == 'PROD') {
		fileNamesString = fileNamesString + instanceFilePath.split('/')[2];
	}
	if (bindedFilePaths) {
		bindedFilePaths.forEach((path) => {
			if (process.env.ENV == 'DEV') {
				fileNamesString = fileNamesString + ', ' + path.split('\\')[2];
			} else if (process.env.ENV == 'PROD') {
				fileNamesString = fileNamesString + ', ' + path.split('/')[2];
			}
		});
	}
	return fileNamesString;
}

exports.responseForFileUpload = async (req, res) => {
	try {
		fileType = req.body.fileType;
		username = req.body.username;
		lob_name = req.body.lob_name;
		if (!fileType || !username || !lob_name) {
			throw new Error();
		}
	} catch (err) {
		console.log(err);
		return res.status(400).send('Inavlid request payload');
	}
	try {
		const data =
			req.convertedData != null
				? JSON.stringify(req.convertedData)
				: () => {
						throw new Error('converted file is empty!');
				  };
		const fileNames = req.fileNames;
		const uniqueSuffix = UniqueSuffix();
		const convertedFileName = `converted-${uniqueSuffix}.json`;
		const db = new DBUtility();
		const sql = `INSERT INTO ${process.env.LOGS_TABLE_NAME} (lob_name, username, conversionStatus, convertedOn, fileType, uploadedFileName, convertedFileName)
	VALUES ('${lob_name}', '${username}', true, CURRENT_TIMESTAMP, '${fileType}', '${fileNames}', '${convertedFileName}');
		`;
		fs.writeFileSync(
			path.join('resources', 'converted', convertedFileName),
			data
		);
		results = await db.processSqlQuery(sql);
		res.status(200).send({ fileName: convertedFileName });
	} catch (err) {
		res.status(500).send(
			err.message ? err.message : 'Error in Storing the file'
		);
	}
};

exports.handleFileDownload = async (req, res) => {
	let fileName;
	try {
		fileName = req.body.fileName;
		if (!fileName) {
			throw new Error();
		}
	} catch (err) {
		console.log(err);
		return res.status(400).send('Missing filename!');
	}
	try {
		res.setHeader('Content-Type', 'application/json');
		res.setHeader(
			'Content-disposition',
			'attachment; filename=config.json'
		);
		res.header('Access-Control-Allow-Origin', '*');
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		);
		if (fileName.includes('converted')) {
			res.download(path.join('resources', 'converted', fileName));
		} else {
			res.download(path.join('resources', 'uploaded', fileName));
		}
	} catch (err) {
		console.log(err);
		return res.status(500).send('Error in file download');
	}
};
