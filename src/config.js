exports.PORT = process.env.PORT || 8080;

exports.CLIENT_ORIGIN =
	process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:3000';
