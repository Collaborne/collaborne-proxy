/* jshint node: true */
'use strict';

const port = process.env.PORT || 8080;

const path = require('path');
const fs = require('fs');
const url = require('url');

const express = require('express');
const proxy = require('express-http-proxy');
const morgan = require('morgan');

function createProxy(proxyUrl) {
	return proxy(proxyUrl.href, {
		forwardPath: function(req, res) {
			// FIXME: https://github.com/villadora/express-http-proxy/issues/131 considers munging the query string into the path sensible.
			const path = proxyUrl.path + req.path;
			const query = url.parse(req.originalUrl, false).search || '';
			return url.resolve(path, query);
		}
	});
}

const app = express();
const server = require('http').Server(app);

app.use(morgan('short'));

const endpoint = process.argv[2];
const apiProxyUrl = url.parse(url.resolve(endpoint, 'api'));
const loginProxyUrl = url.parse(url.resolve(endpoint, 'login'));

app.use('/api/', createProxy(apiProxyUrl));
app.use('/login/', createProxy(loginProxyUrl));

const listener = server.listen(port, function(message) {
	console.log(`collaborne-proxy ready on port ${listener.address().port}`);
	console.log(`API endpoint: ${apiProxyUrl.href}`);
	console.log(`Login endpoint: ${loginProxyUrl.href}`);
});
