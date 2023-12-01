const UniqueSuffix = () => {
	return Date.now() + '-' + Math.round(Math.random() * 1e9);
};

module.exports = UniqueSuffix;
