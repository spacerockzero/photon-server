module.exports = function(data) {

  // turning timestamps into usable human-readable durations for logs
  if (!data.timings) {
    return data;
  }

  //////////////////////////////////////////////////////////////////////////////////
  //  UTILITY FUNCTIONS
  ////////////////////////////////////////////////////////////////////////////////

  // check for above-zero values of two timestamps, then diff them for duration
  function getDuration(start, end) {
    let duration
    if (start
      && start > 0
      && end
      && end > 0) {
      let dur = end - start
      if (dur > 0) {
        duration = dur
      }
    }
    return duration
  }


  //////////////////////////////////////////////////////////////////////////////////
  //  GET DURATIONS
  ////////////////////////////////////////////////////////////////////////////////

  data.pageDurations    = {
    loadTime:             getDuration(data.timings.navigationStart, data.timings.loadEventEnd),
    DOMContentLoaded:     getDuration(data.timings.navigationStart, data.timings.domContentLoadedEventEnd),
    timeToFirstByte:      getDuration(data.timings.navigationStart, data.timings.responseStart),
    firstPaint:           getDuration(data.timings.navigationStart, data.firstPaint),
    frontEndTime:         getDuration(data.timings.responseStart, data.timings.loadEventEnd),
    serverConnectionTime: getDuration(data.timings.navigationStart, data.timings.requestStart),
    pageRenderTime:       getDuration(data.timings.domContentLoadedEventEnd, data.timings.loadEventEnd)
  }

  data.resourceDurations = data.resources.map(resource => {
    return {
      name:                         resource.name,
      redirectTime:                 getDuration(resource.redirectStart, resource.redirectEnd),
      dnsTime:                      getDuration(resource.domainLookupStart, resource.domainLookupEnd),
      tcpHandshakeTime:             getDuration(resource.connectStart, resource.connectEnd),
      secureConnectionTime:         getDuration(resource.secureConnectionStart, resource.connectEnd),
      responseTime:                 getDuration(resource.responseStart, resource.responseEnd),
      fetchUntilResponseEnd:        getDuration(resource.fetchStart, resource.responseEnd),
      requestStartUntilResponseEnd: getDuration(resource.requestStart, resource.responseEnd),
      startUntilResponseEnd:        getDuration(resource.startTime, resource.responseEnd)
    }
  });

  return data;
}
