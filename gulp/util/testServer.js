'use strict';

import express from 'express';
import morgan from 'morgan';
import gutil from 'gulp-util';

export default function testServer({ port, dir }) {
	const app = express();

	const MOCK_API_PATH = '/api';

	app.use(morgan('dev'));
	app.use(express.static(dir));

	app.get('/*', (req, res, next) => {
		//Check to see if mock API request
		if (req.url.indexOf(MOCK_API_PATH) > -1) {
			gutil.log('Mock API Request: ', req.url);

			return next();
		}

		gutil.log('Rewriting Test Server Request to index.html');

		res.sendFile('index.html', {
			'root': dir
		});
	});

	return new Promise((resolve) => {
		const server = app.listen(port, () => {
			resolve(server);
		});
	});
}
