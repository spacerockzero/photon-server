const UserTimingDecompression = require("usertiming-compression").UserTimingDecompression;
const ResourceTimingDecompression = require('resourcetiming-compression').ResourceTimingDecompression;
const LZString = require('lz-string');

module.exports = function(data) {
  // console.log('data.timingsCompressed:', data.timingsCompressed);

  // if compressed, decompress user timings
  if (data.userTimingsCompressed) {
    data.userTimings = UserTimingDecompression.decompressUserTiming(data.userTimingsCompressed);
    // console.log('data.timings:', data.userTimings);
    data.userTimingsCompressed = null;
  }

  // if compressed, decompress resource timings
  if (data.resourcesCompressed) {
    data.resources = ResourceTimingDecompression.decompressResources(data.resourcesCompressed.restiming, data.resourcesCompressed.servertiming);
    data.resourcesCompressed = null;
  }

  if (data.LZString === true) {
    data = JSON.parse(LZString.decompressFromEncodedURIComponent(data.data));
  }

  return data;

}
