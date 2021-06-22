import { Decimal } from 'decimal.js'


const roundedSpace = async (diffSpace, high) => {
    let rds;
    let startSpot;
    const testHigh = new Decimal(high);
    
    if(diffSpace.toNumber()<1){
        const p = Math.abs(Math.floor(Math.log10(diffSpace)))
        rds = ((diffSpace.toDP(p)).toNumber())
        return [rds, startSpot]
    } else{
        const p = Math.abs(Math.floor(Math.log10(diffSpace)))
        //p finds from the (high-low/split) how many places you can drop off
        let varP;
        switch(p){
            case 0:
                varP = 1 
                break;
            case 1:
                varP = 10
                break;
            case 2:
                varP = 100
                break;
            case 3:
                varP = 1000
                break;
            case 4:
                varP = 10000
                break;
        }
        rds = ((Math.round(diffSpace/varP)*varP))
        startSpot = ((Math.round(high/varP)*varP)) 

        return [rds, startSpot]
    }
}
const addPrice=async(high, low, split, ctx, ctxTemp_height, ctxTemp_width) => {
    let diffSpace = new Decimal((high, low)/split)
    const [rds, startSpot] = await roundedSpace(diffSpace, high)

    let x = 0
    const jump = ctxTemp_height/split
    for(let i=0; i<split; i++){
        ctx.beginPath()
        ctx.lineWidth=1
        ctx.moveTo(0, x)
        ctx.lineTo(ctxTemp_width, x)
        ctx.strokeStyle = "blue"
        ctx.stroke()

        ctx.font = '19px Arial'
        ctx.textAlign = 'start'
        ctx.fillStyle = 'blue'
        ctx.fillText(i, ctxTemp_width-25, x)
        x+=jump
    }
}




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
    ctx.font = '12px Arial'
    ctx.textAlign = 'start'
    ctx.fillStyle = 'red'
    ctx.fillText(date, x, (ctxTemp_height-100))
}

export const drawAxis = async(data, tf, high, low)=>{
    const can = document.getElementById("main"),
        ctx = can.getContext("2d"),
        ctxTemp_height = can.height,
        ctxTemp_width = can.width;
    let x=10;
    let compare = getDate(data[0].date)

    addPrice(high, low, 10, ctx, ctxTemp_height, ctxTemp_width)
    switch(tf){
        case '1h':
            data.forEach((el)=>{
                let date= getDate(el.date)
                if(date.Day != compare.Day){
                    compare.Day = date.Day;
                    addAxis(date.Day, x, ctx, ctxTemp_height, ctxTemp_width)
                }x+=4
            })
        case '1d':
            data.forEach((el)=>{
                let date=getDate(el.date)
                if(date.Month!=compare.Month){
                    compare.Month = date.Month;
                    addAxis(date.Month, x, ctx, ctxTemp_height,)
                }x+=4
            }) 
        case '1w':
            data.forEach((el)=>{
                let date=getDate(el.date)
                if(date.Month!=compare.Month){
                    compare.Month = date.Month;
                    addAxis(date.Month, x, ctx, ctxTemp_height,)
                }x+=4
            })  
    }
    return (<div></div>)
}
