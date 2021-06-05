
//write the date at bot
function drawAxis(df){
      var date = 0,
          grid =50,
          count = 0,
          ctxTemp_width = can.width,
          ctxTemp_height = can.height;
          year=0,
          month=0,
          day=0,
          date=0,
          dateTest=0,
          yearTest=0,
          monthTest=0,
          dayTest=0;
          df.forEach(el =>{
              dateTest = new Date(el.date *1000)
              yearTest = dateTest.getFullYear()
              monthTest = dateTest.getMonth()+1
              dayTest = dateTest.getDate()
              dateTest = dayTest + " "+monthTest+" "+yearTest
              if(date == 0){
                  date = new Date(el.date *1000)
                  year = date.getFullYear()
                  month = date.getMonth()+1
                  day = date.getDate()
                  date = date + " "+month+" "+year
              }
              else if (dayTest != day){
                  date = new Date(el.date *1000)
                  year = date.getFullYear()
                  month = date.getMonth()+1
                  day = date.getDate()
                  date = day + " "+month+" "+year
                  ctx.beginPath()
                  ctx.lineWidth = 1
                  ctx.moveTo(grid, 0)
                  ctx.lineTo(grid, ctxTemp_height)
                  ctx.strokeStyle = "red"
                  ctx.stroke()
                  //date at bot 475 is bot spot
                  ctx.font = '9px Arial'
                  ctx.textAlign = 'start'
                  ctx.fillText(day, grid, 475)
                  grid +=100
              }
              
          })}
  
  
  