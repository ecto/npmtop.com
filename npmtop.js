/*
 * npmtop.com
 * <cam@onswipe.com>
 */

var http = require('http'),
    fs = require('fs');
    request = require('request'),
    director = require('director'),
    broomstick = require('broomstick'),
    router = new director.http.Router(),
    static = new broomstick(),
    authors = '';

function cache () {
  request('http://search.npmjs.org/_view/author?group=true', function (err, res, body) {
    authors = body;
  });
}

cache();
setInterval(cache, 30000); // every 5 minutes

router.get('/authors', function () {
  this.res.writeHead(200, { 'Content-Type': 'text/plain' });
  this.res.end(authors);
});
router.get('*', static);
router.get('/', static);

var server = http.createServer(function (req, res) {
  router.dispatch(req, res);
});

server.listen(8080);
