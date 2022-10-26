/* app.js */
const path = require('path');
const express = require("express");
const fs = require('fs');
const models = require ('./models.js');
const serverController = require ('./controller/servercontroller.js');

const PORT = process.env.PORT || "4318";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.post("/signin", (req, res) => {
  res.redirect('/redirected');
})

app.get("/redirected", (req, res) => {
  res.send("redirect successful");
})

/*
//this will write the trace data to testData.json
app.use("/v1/traces", (req, res) => {
	console.log(req.body);
	let data = req.body.resourceSpans;
	fs.appendFileSync(path.resolve(__dirname, './testData.json'),
	JSON.stringify(data) + '\n');
	res.status(200).send("v1/traces endpoint")
})
*/


//this will send the trace data to middleware that will write the data to a db
app.use("/v1/traces", serverController.writeToDB, (req, res) => {
	console.log("this is what is added to the db", res.locals.trace);
	res.status(200).send("successful add")
})


app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});



app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});