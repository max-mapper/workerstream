var ParentStream = require('../parent.js')

module.exports = function(){
  var parentStream = ParentStream()
  // just loopback data
  parentStream.pipe(parentStream)
}