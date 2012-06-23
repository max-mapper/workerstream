var workerstream = require('workerstream')

var worker = workerstream('demo-worker.js')

worker.on('data', function(data) {
  console.log(data)
})
worker.write('this message went to the worker and back')
worker.end()
