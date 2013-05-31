# domnode-webworker

    npm install workerstream

use HTML5 [web workers](https://developer.mozilla.org/En/Using_web_workers) the node way -- with streams

    var worker = workerstream('my-worker.js')

`worker` is a stream and speaks stream events: `data`, `error` and `end`. that means you can pipe worker output to anything that accepts streams, such as an XHR. you can also pipe data into workers (such as a webcam feed or audio data)

## transferable objects

```js
worker.write(arraybuffer, [arraybuffer])
```

MIT LICENSE