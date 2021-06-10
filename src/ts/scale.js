import React from 'react'



export const scale = async(plot) => {
      let high =0;
      let low
      
      plot.forEach(el =>{
        high = el.high > high ? el.high : high;
        low = !low || el.low < low ? el.low : low;
      })
      let scale = high-low;
      var spaceTop = scale / 100,  //update cavans h/w and clear rect h/w (draw())
              spaceBot = 5;
          plot = plot.map(el => {
              return {
              // low: (el.low - low)/scale,
              // high: (el.high - low)/scale,
              // open: (el.open - low)/scale,
              // close: (el.close - low)/scale,
              // date: el.date
              low: (100 - (scale - (high - el.low)) / spaceTop) * spaceBot, 
              high: (100 - (scale - (high - el.high)) / spaceTop) * spaceBot,
              open: (100 - (scale - (high - el.open)) / spaceTop) * spaceBot,
              close: (100 - (scale - (high - el.close)) / spaceTop) * spaceBot,
              date: el.date
              };
          });
      return plot;
    }