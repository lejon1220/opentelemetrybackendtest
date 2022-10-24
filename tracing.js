/* tracing.js */

// Require dependencies
// const opentelemetry = require("@opentelemetry/sdk-node");
// const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
// const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');

// // For troubleshooting, set the log level to DiagLogLevel.DEBUG
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// // sdk here is the code that is instructing our local machine to console log the spans collected. 
//   // specifically the ConsoleSpanExporter
// const sdk = new opentelemetry.NodeSDK({
//   // Specifies which Exporter Tool 
//   traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
//   // Specify instrumentation tool 
//   instrumentations: [getNodeAutoInstrumentations()]
// });

// sdk.start()

const opentelemetry = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");

const sdk = new opentelemetry.NodeSDK({
  traceExporter: new OTLPTraceExporter({
    // optional - url default value is http://localhost:4318/v1/traces
    url: "http://localhost:4318/v1/traces",
    // url: "<your-otlp-endpoint>/v1/traces",
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();