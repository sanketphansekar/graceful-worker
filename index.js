const { onShutdown } = require("node-graceful-shutdown");
const { start, stop } = require("./worker");

// Passing an array of 5 items considering it has 5 records to process
// Array will look like [0,1,2,3,4]
start([...Array(5).keys()]);


// Handler stop your worker
const stopMyApp = async () => {

    await stop();
};

// Handle application's shutdown.
onShutdown(stopMyApp);