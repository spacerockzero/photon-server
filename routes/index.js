const express = require('express');
const router = express.Router();
const beaconLogger = require('../lib/beacon-logger');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(204);
});

/* POST photon-beacon */
router.post('/beacon', beaconLogger);

module.exports = router;
