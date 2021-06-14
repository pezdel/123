export const scale = (plot, high, diff) => {
  let spaceTop = diff / 100,
    spaceBot = 5;
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
