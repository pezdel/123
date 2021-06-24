function scaleAPI(fullplot, start, windowSize){
      let high = 0,
          low,
          scale,
          plot = []
          newWindow = start + windowSize;
      while (start < newWindow){ 
        if(fullplot[start] == null){
          break
        }
        else{
          plot.push(fullplot[start])
          start +=1
        }
      }
      plot.forEach(el => {
          high = el.high > high ? el.high : high;
          low = !low || el.low < low ? el.low : low;
      });
      scale = high - low;
      var spaceTop = scale / 100,  //update cavans h/w and clear rect h/w (draw())
          spaceBot = 2;
      plot = plot.map(el => {
          return {
          low: (100 - (scale - (high - el.low)) / spaceTop) * spaceBot, 
          high: (100 - (scale - (high - el.high)) / spaceTop) * spaceBot,
          open: (100 - (scale - (high - el.open)) / spaceTop) * spaceBot,
          close: (100 - (scale - (high - el.close)) / spaceTop) * spaceBot,
          date: el.date
          };
        });
        return plot;
        }


        //inside of dashboard, it should be a function to call
        //buildchart.js
        //inside of buildchart
        //should be a componut to make everything needed
        //dropdown that loads with eur/usd
        //updates on re-freesh
        //under that 