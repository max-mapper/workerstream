// fills an arraybuffer with 1's
module.exports = function(ab) {
  var buf = new Uint8Array(ab.byteLength)
  for (var n = 0; n < buf.length; n++) buf[n] = 1
  return buf.buffer
}