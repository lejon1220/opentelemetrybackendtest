const { model } = require('mongoose');
const models = require('../models.js');
const serverController = {};


serverController.writeToDB = (req, res, next) => {
  //write data from req.body to the db
	const data = req.body.resourceSpans;
	const parsedData = JSON.stringify(data);
  const newTrace = new models.Trace ({
		data: parsedData
	})
	newTrace.save((err, trace) => {
		if (err) return next(err);
		res.locals.trace = trace;
		next();
	})

}

module.exports = serverController;