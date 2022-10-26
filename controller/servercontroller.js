const { model } = require('mongoose');
const models = require('../models.js');
const serverController = {};


serverController.writeToDB = (req, res, next) => {
  //write data from req.body to the db
	console.log("in writetodb")
	const data = req.body;
	console.log("this is the entire response", req)
	console.log("this is the req.body", data);
	if (data === {}){ return next("no data in req.body")};
	const parsedData = JSON.stringify(data);
  const newTrace = new models.Trace ({
		data: parsedData
	})
	newTrace.save((err, trace) => {
		if (err) return next("error adding to db");
		res.locals.trace = trace;
		next();
	})

}

module.exports = serverController;