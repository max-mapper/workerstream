var workerstream = require('./index');

var worker = workerstream('demo-worker.js');

worker.on('data', function(data) {
  console.log(new Uint8Array(data));
});

var ab = new ArrayBuffer( 10 );
worker.write( ab );
worker.end();