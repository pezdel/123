import { getDate, roundedSpace, getP } from './utils';
import { scale } from './utils';
import { mainDivHeight, dateOffset, priceOffset, x } from './const'

             // draw (data, mainDivWidth, tf, mainCtx)
// export const draw = async (data, height, width, tf, dateOffset, priceOffset, ctx, x, high, low, diff) => {
export const draw = async(data, width, tf, ctx, high, low, diff) => {
    const split = 10;
    const height = mainDivHeight;
    

    const ctx_Date_Pos = height-dateOffset, 
        ctx_Price_Pos = width-priceOffset/2;

    const drawMain = async (data) => {
        ctx.clearRect(0, 0, width, height);
        let y = 10;
        data.forEach((el) => {
            if (el.open > el.close) {
                ctx.strokeStyle = "green";
            } else {
                ctx.strokeStyle = "red";
            }
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(y, el.high);
            ctx.lineTo(y, el.low);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.moveTo(y, el.open);
            ctx.lineTo(y, el.close);
            ctx.stroke();
            y+=x;
        });
    }

    const drawPriceAxis=async(high, low) => {
        console.log(height)
        let diffSpace =(high - low)/split
        let [rds, xPrice] = await roundedSpace(diffSpace, high)
        let xPx = ((high - xPrice)/diff)*(height-priceOffset)
        let rdsPx = ((high - (xPrice-rds))/diff)*height

        for(let i=0; i<split; i++){
            ctx.beginPath()
            ctx.lineWidth=1
            ctx.moveTo(0, xPx)
            ctx.lineTo(width, xPx)
            ctx.strokeStyle = "#c9c7c5"
            ctx.stroke()

            ctx.font = '16px Times New Roman'
            ctx.textAlign = 'start'
            ctx.fillStyle = 'grey' 
            ctx.fillText(xPrice, ctx_Price_Pos, xPx)

            xPx = ((high - (xPrice-rds))/diff)*(height-priceOffset)
            xPrice -= rds
        }
    }



    const drawDateAxis = async(data)=>{
        let y = 10;
        let compare = getDate(data[0].date)
        switch(tf){
            case '1h':
                data.forEach((el)=>{
                    let date= getDate(el.date)
                    if(date.Day != compare.Day){
                        if((date.Day-compare.Day)> 1){
                            compare.Day = date.Day;
                            addDate("", y, ctx, height , ctx_Date_Pos)
                        }else{
                        compare.Day = date.Day;
                            addDate(date.Month + "/" +date.Day, y, ctx, height , ctx_Date_Pos)
                        }
                    }y+=x
                })
            case '1d':
                data.forEach((el)=>{
                    let date=getDate(el.date)
                    if(date.Month!=compare.Month){
                        compare.Month = date.Month;
                        addDate(date.Month, y, ctx, height, ctx_Date_Pos)
                    }y+=x
                }) 
            case '1w':
                data.forEach((el)=>{
                    let date=getDate(el.date)
                    if(date.Month!=compare.Month){
                        compare.Month = date.Month;
                        addDate(date.Month, y, ctx, height, ctx_Date_Pos)
                    }y+=x
                })  
        }
        return (<div></div>)
    }
    const scaled = await scale(data, high, diff, height-dateOffset)
    drawMain(await scaled)
    drawPriceAxis(high, low)
    drawDateAxis(await scaled)
}

const addDate = (time, y, ctx, height, ctx_Date_Pos) => {
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.moveTo(y, 0)
    ctx.lineTo(y, height)
    ctx.strokeStyle = "#c9c7c5"
    ctx.stroke()
    //date
    ctx.font = '16px Times New Roman'
    ctx.textAlign = 'start'
    ctx.fillStyle = 'grey'
    ctx.fillText(time, y, (height))
}
// draw(await scaled, 
//     mainHigh,
//     mainLow,
//     mainDiff,
//     10,
//     mainDivHeight,
//     mainDivWidth,
//     tf,
//     dateOffset,
//     priceOffset,
//     mainCtx,
// export const draw = (data, height, width, tf, dateOffset, priceOffset, ctx, x) => {
// )
