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
  let spaceTop = diff / 90,
    spaceBot = 3;
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
//things left on chart
//---scale with window size
//---price/dates
//---orginize it
//---start placing to see what else is missing


//back to price/dates axis
//with full json and TF
//loop to find markers...issue is zoom-ability
//maybe for hourly mark all the days but only show certain spots? based on window size?
//for daily mark all the months 
//issue is, how to determine how many markers are shown per chart? if its resized abit
//I dont want to showing way to many or not enough it needs to be smart with what it shows
//