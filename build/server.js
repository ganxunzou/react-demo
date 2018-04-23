var express = require('express'),
app = express();
app.use('/static', express.static('static'));
app.listen(7000, '127.0.0.1', function(err) {
  err && console.log(err);
});
