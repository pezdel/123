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


export const scale = (plot, high, diff) => {
  let spaceTop = diff / 100,
    spaceBot = 4;
  plot = plot.map((el) => {
    return {
      low: (100 - (diff - (high - el.low)) / spaceTop) * spaceBot,
      high: (100 - (diff - (high - el.high)) / spaceTop) * spaceBot,
      open: (100 - (diff - (high - el.open)) / spaceTop) * spaceBot,
      close: (100 - (diff - (high - el.close)) / spaceTop) * spaceBot,
      date: el.date,
    };
  });
  return plot;
};
