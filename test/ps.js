var WebWorkify = require('webworkify')
var WorkerStream = require('../index.js')
var test = require('tape')

test('Data can be transfered bidirectionally with ParentStream',function(t){
  t.plan(1)

  var worker = WebWorkify(require('./ps-loopback-worker.js'))
  var workerStream = WorkerStream(worker)

  var testSlug = 'this is a test slug'

  workerStream.on('data', function(data) {
    t.equal(testSlug,data)
    t.end()
  })

  workerStream.write( testSlug )
  workerStream.end()

})