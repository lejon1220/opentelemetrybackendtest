const mongoose = require ('mongoose');

const MONGO_URI = "mongodb+srv://lejon1220:0259@jonathan-data.vrgxqxt.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {

  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'OpenTelemetryTraces'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log("Could Not Connect to Mongo DB", err));

	const Schema = mongoose.Schema;

  const traceSchema = new Schema({
		data: {type: String, required: true},
	})
  
	const Trace = mongoose.model('Trace', traceSchema);
	
	module.exports = {
    /*insert schemas here for export */
    Trace
	};