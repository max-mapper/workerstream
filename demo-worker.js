var oneFiller = require('./one-filler')

self.onmessage = function(event) {
  var ab = event.data
  ab = oneFiller(ab)
  self.postMessage(ab, [ab])
}

