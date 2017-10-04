const doDecompress = require('./decompress');
const doTimingCalculations = require('./timing-calculations');

module.exports = (req, res, next) => {

  console.log('req.text:', req.text);

  // Parse beacon data
  let data = req.text
    ? JSON.parse(req.text) // chrome bad boy for now
    : req.body // firefox (good boy)

  // if fields are compressed, decompress them
  data = doDecompress(data);

  // do all calculations
  data = doTimingCalculations(data);

  // Write log
  console.log('PHOTON_DATA:', data);

  res.sendStatus(204);

};
