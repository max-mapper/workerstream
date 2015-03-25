var stream = require('stream')
var inherits = require('inherits');
var toBuffer = require('typedarray-to-buffer');
var isTypedArray = require('is-typedarray');

function WorkerStream(path) {
  stream.Stream.call(this)
  this.readable = true
  this.writable = true
  this.worker = typeof path === 'string'
    ? new Worker(path)
    : path
  this.worker.onmessage = this.workerMessage.bind(this)
  this.worker.onerror = this.workerError.bind(this)
}

inherits(WorkerStream, stream.Stream)

module.exports = function(path) {
  return new WorkerStream(path)
}

module.exports.WorkerStream = WorkerStream

WorkerStream.prototype.workerMessage = function(e) {
  var data = e.data;
  if (isTypedArray(e.data) && !Buffer.isBuffer(data)) data = toBuffer(data);
  this.emit('data', data, e)
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
