export function findPeaks(data, options = {}) {
    const {height = 0, distance = 1, prominence = 0} = options;
    //console.log(data)
    let peaks = [];
    let filteredPeaks = [];
    let minHeight = 10;
  
    // Step 1: Find all peaks
    for (let i = 1; i < data.length - 1; i++) {
      if (data[i] > data[i - 1] && data[i] > data[i + 1] && data[i] > height) {
        peaks.push({
          index: i,
          value: data[i],
          prominence: 0, // initialize prominence
        });
      }
    }
  
    // Step 2: Filter by distance
    if (distance > 1) {
      let lastPeak = null;
      peaks.forEach((peak) => {
        if (lastPeak === null || peak.index - lastPeak.index >= distance) {
          filteredPeaks.push(peak);
          lastPeak = peak;
        }
      });
    } else {
      filteredPeaks = peaks;
    }
  
    // Step 3: Calculate and filter by prominence
    if (prominence > 0) {
      filteredPeaks = filteredPeaks.filter((peak) => {
        const peakHeight = peak.value;
        let leftMin = Infinity;
        let rightMin = Infinity;
        // Find the minimum on the left
        for (let i = peak.index - 1; i >= 0 && i >= peak.index - distance; i--) {
          if (data[i] < leftMin) leftMin = data[i];
        }
        // Find the minimum on the right
        for (
          let i = peak.index + 1;
          i < data.length && i <= peak.index + distance;
          i++
        ) {
          if (data[i] < rightMin) rightMin = data[i];
        }
        // Calculate prominence
        const minElevation = Math.min(leftMin, rightMin);
        peak.prominence = peakHeight - minElevation;
        return peak.prominence >= prominence;
      });
    }
  
    // Return indices of peaks
    return filteredPeaks.map((peak) => peak.index);
  }
  
  function averageArray(arr) {
    if (arr.length === 0) return 0; // Handle empty array case
  
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
  }
  
  function getStandardDeviation(array) {
    if (!array || array.length === 0) {
      return 0;
    }
    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    return Math.sqrt(
      array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n,
    );
  }
  
  export function findRealTimeHR(data) {
    let peaks = findPeaks(data);
    //console.log("peak indices: " +peaks)
    let HRArray = [];
    let HRVArray = [];
    let realTimeHR = 0;
    let realtimeHRV = 0;
    for (let i = 1; i < peaks.length; i++) {
      let diff = peaks[i] - peaks[i - 1];
      let HR = (60 * 22) / diff;
      let HRV = (diff * 1000) / 22;
      HRArray.push(HR);
      HRVArray.push(HRV);
    }
    realTimeHR = averageArray(HRArray);
    realtimeHRV = getStandardDeviation(HRVArray);
    return {
      HR: Math.round(realTimeHR),
      HRV: Math.round(realtimeHRV),
    };
  }
  
  export function findRealTimeResp(data) {
    let peaks = findPeaks(data);
    //console.log("peak indices: " +peaks)
    let respArray = [];
    let realTimeResp = 0;
    for (let i = 1; i < peaks.length; i++) {
      let diff = peaks[i] - peaks[i - 1];
      let resp = (60 * 22) / diff;
      respArray.push(resp);
    }
    realTimeResp = averageArray(respArray);
    return Math.round(realTimeResp);
  }
  