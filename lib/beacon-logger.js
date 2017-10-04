const doDecompress = require('./decompress');
const doTimingCalculations = require('./timing-calculations');

module.exports = (req, res, next) => {

  // Parse beacon data
  let data = req.body;

  // if fields are compressed, decompress them
  data = doDecompress(data);

  // do all calculations
  data = doTimingCalculations(data);

  // Write log
  console.log('PHOTON_DATA:', data);

  res.sendStatus(204);

};
