export const findHighLow = async (data) => {
    let high = 0, 
    	low;
    data.forEach((el) => {
      high = el.high > high ? el.high : high;
      low = !low || el.low < low ? el.low : low;
    });
    const diff = high-low
    return [high, low, diff];
};

