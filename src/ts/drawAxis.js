import { draw } from "./draw";

//sike I want it to take roundish numbers and have them float to next level
//figure out way to overlap canvas's? bars, dates, price and then snipit

const getDate = (date) => {
    let df = new Date(date * 1000)
    let Year = df.getFullYear(),
        Month = df.getMonth()+1,
        Day = df.getDate()
        //getDate = getDay + " " + getMonth + " " + getYear;
    return {Year, Month, Day}
}

const addAxis = (date, x, ctx, ctxTemp_height, ctxTemp_width) => {
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.moveTo(x, 0)
    ctx.lineTo(x, ctxTemp_height)
    ctx.strokeStyle = "red"
    ctx.stroke()
    //date
    ctx.font = '9px Arial'
    ctx.textAlign = 'start'
    ctx.fillText(date, x, (ctxTemp_height-25))
}

export const drawAxis = async(plot, tf, compareDate) =>{
    const can = document.getElementById("can-date"),
       ctx = can.getContext("2d");
    const ctxTemp_height = can.height,
          ctxTemp_width = can.width;
    ctx.clearRect(0, 0, 700, 500);
    let x=10;
    let compare = getDate(compareDate)

    switch(tf){
       case '1h':
           plot.forEach((el)=>{
               let date= getDate(el.date)
               if(date.Day != compare.Day){
                compare.Day = date.Day;
                addAxis(date.Day, x, ctx, ctxTemp_height, ctxTemp_width)
            }x+=4
           })
        case '1d':
            plot.forEach((el)=>{
                let date=getDate(el.date)
                if(date.Month!=compare.Month){
                    compare.Month = date.Month;
                    addAxis(date.Month, x, ctx, ctxTemp_height,)
                }x+=4
            }) 
        case '1w':
            plot.forEach((el)=>{
                let date=getDate(el.date)
                if(date.Month!=compare.Month){
                    compare.Month = date.Month;
                    addAxis(date.Month, x, ctx, ctxTemp_height,)
                }x+=4
            })  
    }
    return (<div></div>)
}
