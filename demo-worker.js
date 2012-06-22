// for demo: bounces message data back
self.onmessage = function(event) {
  self.postMessage(event.data)
}

