import { draw } from "./draw";

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

export const drawAxis = async(plot, tf, ctx, compareDate, ctxTemp_height, ctxTemp_width) =>{
    let x=10;
    let compare = getDate(compareDate)
    plot.forEach((el) => {
        let date = getDate(el.date)
        switch(tf){
            case '1h':
                if(date.Day != compare.Day){
                    compare.Day = date.Day;
                    addAxis(date.Day, x, ctx, ctxTemp_height, ctxTemp_width)
                }
                break
            case '1d':
                if(date.Month != compare.Month){
                    compare.Month = date.Month;
                    addAxis(date.Month, x, ctx, ctxTemp_height, ctxTemp_width);
                }
                break
            case '1w':
                if(date.Month != compare.Month){
                    compare.Month = date.Month;
                    addAxis(date.Month, x, ctx, ctxTemp_height, ctxTemp_width);
                }
                break
        }
        x+=4;
    })
    return(<div></div>)
}