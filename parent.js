var stream = require('stream')
var util = require('util')

function ParentStream(workerGlobal){
  stream.Stream.call(this)
  this.readable = true
  this.writable = true
  this.parent = workerGlobal || self
  this.parent.onmessage = this.parentMessage.bind(this)
  this.parent.onerror = this.parentError.bind(this)
  return parentStream
}

util.inherits(ParentStream, stream.Stream)

module.exports = function(workerGlobal) {
  return new ParentStream(workerGlobal)
}

module.exports.ParentStream = ParentStream

ParentStream.prototype.parentMessage = function(e) {
  this.emit('data', e.data, e)
}

ParentStream.prototype.parentError = function(err) {
  this.emit('error', err)
}

// opts is for transferable objects
ParentStream.prototype.write = function(data, opts) {
  this.parent.postMessage(data, opts)
  return true
}

ParentStream.prototype.end = function() {
  this.emit('end')
}