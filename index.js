var stream = require('stream')
var util = require('util')

function WorkerStream(path) {
  var me = this
  stream.Stream.call(me)
  this.readable = true
  this.writable = true
  me.worker = typeof path === 'string'
    ? new Worker(path)
    : path
  me.worker.onmessage = me.workerMessage.bind(this)
  me.worker.onerror = me.workerError.bind(this)
}

util.inherits(WorkerStream, stream.Stream)

module.exports = function(path) {
  return new WorkerStream(path)
}

module.exports.WorkerStream = WorkerStream

WorkerStream.prototype.workerMessage = function(e) {
  this.emit('data', e.data, e)
}

WorkerStream.prototype.workerError = function(err) {
  this.emit('error', err)
}

// opts is for transferable objects
WorkerStream.prototype.write = function(data, opts) {
  this.worker.postMessage(data, opts)
  return true
}

WorkerStream.prototype.end = function() {
  this.emit('end')
}
