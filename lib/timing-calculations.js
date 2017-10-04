module.exports = function(data) {

  // turning timestamps into usable human-readable durations for logs
  if (!data.timings) {
    return data;
  }

  data.durations = {
    loadTime: loadTime(data),
    DOMContentLoaded: DOMContentLoaded(data),
    timeToFirstByte: timeToFirstByte(data),
    firstPaint: firstPaint(data),
    frontEndTime: frontEndTime(data),
    backEndTime: timeToFirstByte(data),
    serverConnectionTime: serverConnectionTime(data),
    pageRenderTime: pageRenderTime(data)
  }

  // // Load Time metric
  // if(req.query.nt_load_end && req.query.nt_load_end > 0 && req.query.nt_nav_st && req.query.nt_nav_st > 0){
  //   msg += " loadTime=" + (req.query.nt_load_end - req.query.nt_nav_st);
  // }
  function loadTime (data) {
    let duration
    if (data.timings.navigationStart
      && data.timings.navigationStart > 0
      && data.timings.loadEventEnd
      && data.timings.loadEventEnd > 0) {
      let dur = data.timings.loadEventEnd - data.timings.navigationStart
      if (dur > 0) {
        duration = dur
      }
    }
    return duration
  }

  // // DOMContentLoaded (DCL) time
  // if(req.query.nt_domcontloaded_end && req.query.nt_domcontloaded_end > 0 && req.query.nt_nav_st && req.query.nt_nav_st > 0){
  //   msg += " DOMContentLoaded=" + (req.query.nt_domcontloaded_end - req.query.nt_nav_st);
  // }
  function DOMContentLoaded (data) {
    let duration
    if (data.timings.navigationStart
      && data.timings.navigationStart > 0
      && data.timings.domContentLoadedEventEnd
      && data.timings.domContentLoadedEventEnd > 0) {
      let dur = data.timings.domContentLoadedEventEnd - data.timings.navigationStart
      if (dur > 0) {
        duration = dur
      }
    }
    return duration
  }

  // // Time to First Byte
  // msg += " ttfb=" + req.query.t_resp;
  // // Latency
  // if(req.query.nt_res_st && req.query.nt_res_st > 0 && req.query.nt_con_st && req.query.nt_con_st > 0){
  //   msg += " latency=" + (req.query.nt_res_st - req.query.nt_con_st);
  // }

  function timeToFirstByte (data) {
    let duration
    if (data.timings.navigationStart
      && data.timings.navigationStart > 0
      && data.timings.responseStart
      && data.timings.responseStart > 0) {
      let dur = data.timings.responseStart - data.timings.navigationStart
      if (dur > 0) {
        duration = dur
      }
    }
    return duration
  }

  // // first paint metric (only available on chrome and IE/Edge)
  // if(req.query.nt_first_paint && req.query.nt_first_paint > 0 && req.query.nt_nav_st && req.query.nt_nav_st > 0) {
  //   msg += " firstPaint=" + (req.query.nt_first_paint - req.query.nt_nav_st);
  // }

  function firstPaint (data) {
    let duration
    if (data.timings.navigationStart
      && data.timings.navigationStart > 0
      && data.timings.responseStart
      && data.timings.responseStart > 0) {
      let dur = data.timings.responseStart - data.timings.navigationStart
      if (dur > 0) {
        duration = dur
      }
    }
    return duration
  }

  // // Front-end Time (from response-start to page_ready/t_done)
  // if(req.query.t_done && req.query.nt_res_st && req.query.nt_res_st > 0 && req.query.nt_nav_st && req.query.nt_nav_st > 0){
  //   msg += " frontEndTime=" + (req.query.t_done - (req.query.nt_res_st - req.query.nt_nav_st));
  // }

  function frontEndTime (data) {
    let duration
    if (data.timings.loadEventEnd
      && data.timings.loadEventEnd > 0
      && data.timings.responseStart
      && data.timings.responseStart > 0) {
      let dur = data.timings.loadEventEnd - data.timings.responseStart
      if (dur > 0) {
        duration = dur
      }
    }
    return duration
  }

  // // Back-end Time (from nav-start to response-start)
  // if(req.query.nt_res_end && req.query.nt_res_end > 0 && req.query.nt_nav_st && req.query.nt_nav_st > 0){
  //   msg += " backEndTime=" + (req.query.nt_res_end - req.query.nt_nav_st);
  // }

  // This is just another name for ttfb
  function backEndTime (data) {
    return timeToFirstByte()
  }

  // // Server Connection Time
  // if(req.query.nt_req_st && req.query.nt_req_st > 0 && req.query.nt_nav_st && req.query.nt_nav_st > 0){
  //   msg += " serverConnectionTime=" + (req.query.nt_req_st - req.query.nt_nav_st);
  // }

  function serverConnectionTime (data) {
    let duration
    if (data.timings.requestStart
      && data.timings.requestStart > 0
      && data.timings.navigationStart
      && data.timings.navigationStart > 0) {
      let dur = data.timings.requestStart - data.timings.navigationStart
      if (dur > 0) {
        duration = dur
      }
    }
    return duration
  }

  function pageRenderTime (data) {
    let duration
    if (data.timings.domContentLoadedEventEnd
      && data.timings.domContentLoadedEventEnd > 0
      && data.timings.loadEventEnd
      && data.timings.loadEventEnd > 0) {
      let dur = data.timings.loadEventEnd - data.timings.domContentLoadedEventEnd
      if (dur > 0) {
        duration = dur
      }
    }
    return duration
  }

  return data;
}
