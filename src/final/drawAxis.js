import { Decimal } from 'decimal.js'

const getP = async (p) => {
    switch(p){
        case 0:
            return 1 
        case 1:
            return 10
        case 2:
            return 100
        case 3:
            return 1000
        case 4:
            return 10000
    }
}
let varP;
const roundedSpace = async (diffSpace, high) => {
    let rds;
    let startSpot;

    if(diffSpace.toNumber()<1){
        const p = Math.abs(Math.floor(Math.log10(diffSpace))),
            varP = getP(p)
        rds = ((Math.round(diffSpace*await varP)/await varP))
        startSpot = ((Math.round(high*await varP)/await varP)-rds)

        return [rds, startSpot]
    } else{
        const p = Math.abs(Math.floor(Math.log10(diffSpace))),
            varP = getP(p)
        rds = ((Math.round(diffSpace/await varP)*await varP))
        startSpot = ((Math.round(high/await varP)*await varP)) 
        
        return [rds, startSpot]
    }
}
const addPrice=async(high, low, diff, split, ctx, ctxTemp_height, ctxTemp_width) => {
    let diffSpace = new Decimal((high - low)/split)
    let [rds, xPrice] = await roundedSpace(diffSpace, high)
    // console.log("high " + high)
    // console.log("low " + low)
    // console.log("StartSpot " + startSpot)
    // console.log("RDS " + rds)
    // console.log("diff " + diff)
    // console.log(((high-startSpot)/diff)*500)
    let xPx = ((high - xPrice)/diff)*ctxTemp_height
    let rdsPx = ((high - (xPrice-rds))/diff)*ctxTemp_height
    // console.log("xPx " + xPx)
    // console.log("rdsPx " + rdsPx)
    
    for(let i=0; i<split; i++){
        ctx.beginPath()
        ctx.lineWidth=1
        ctx.moveTo(0, xPx)
        ctx.lineTo(ctxTemp_width, xPx)
        ctx.strokeStyle = "blue"
        ctx.stroke()

        ctx.font = '19px Arial'
        ctx.textAlign = 'start'
        ctx.fillStyle = 'blue'
        ctx.fillText(xPrice, ctxTemp_width-50, xPx)

        xPx = ((high - (xPrice-rds))/diff)*ctxTemp_height
        xPrice -= rds
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

export const drawAxis = async(data, tf, high, low, diff)=>{
    const can = document.getElementById("main"),
        ctx = can.getContext("2d"),
        ctxTemp_height = can.height,
        ctxTemp_width = can.width;
    let x=10;
    let compare = getDate(data[0].date)

    addPrice(high, low, diff, 10, ctx, ctxTemp_height, ctxTemp_width)
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
