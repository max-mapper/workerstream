# workerstream

    npm install workerstream

use HTML5 [web workers](https://developer.mozilla.org/En/Using_web_workers) with the node streams API

    var workerstream = require('workerstream')
    var worker = workerstream('my-worker.js')

`worker` is a stream and speaks stream events: `data`, `error` and `end`. that means you can pipe worker output to anything that accepts streams, such as an XHR. you can also pipe data into workers (such as a webcam feed or audio data)

## example

in your app:

```js
var worker = workerstream('worker.js')
worker.on('data', function(data) {
  console.log(data)
})
worker.on('error', function(e) { console.log('err', e)})
worker.write({ hello: 'world' })
```

the worker code (`worker.js` above):

```
self.onmessage = function(event) {
  self.postMessage({whats: 'up'})
}
```

you can also pass in existing webworker instances


## using with webworkify

[webworkify](https://npmjs.org/package/webworkify) allows you to simply create browserified webworkers. 

```js
var WebWorkify = require('webworkify')
var WorkerStream = require('workerstream')

var worker = WebWorkify(require('./worker.js'))
var workerStream = WorkerStream(worker)
```

Your `worker.js` can use this module's `ParentStream` to create a stream connecting back to the parent

```js
var ParentStream = require('workerstream/parent')

module.exports = function(){
  var parentStream = ParentStream()
  parentStream.pipe(somewhereAwesome).pipe(parentStream)
}
```

## transferable objects

```js
worker.write(arraybuffer, [arraybuffer])
```

MIT LICENSE
