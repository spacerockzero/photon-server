var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(204);
});

/* POST photon-beacon */
router.post('/beacon', function(req, res, next) {
  res.send(204);

  // Parse beacon data

  // Write log

});

module.exports = router;
