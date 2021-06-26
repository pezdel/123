import { getDate, roundedSpace, getP } from './utils';
import { scale, findHighLow } from './utils';


export const draw = async (data, height, width, tf, dateOffset, priceOffset, ctx) => {
    const split = 10;
    const [high, low, diff] = await findHighLow(data)
    const scaled = await scale(data, high, diff, height-dateOffset)

    const ctx_Date_Pos = height-dateOffset, 
        ctx_Price_Pos = width-priceOffset/2;

    const drawMain = async (data) => {
        let x = 10;
        ctx.clearRect(0, 0, width, height);

        data.forEach((el) => {
            if (el.open > el.close) {
                ctx.strokeStyle = "green";
            } else {
                ctx.strokeStyle = "red";
            }
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(x, el.high);
            ctx.lineTo(x, el.low);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.moveTo(x, el.open);
            ctx.lineTo(x, el.close);
            ctx.stroke();
            x += 4;
        });
    }

    const drawPriceAxis=async(high, low) => {
        let diffSpace =(high - low)/split
        let [rds, xPrice] = await roundedSpace(diffSpace, high)
        let xPx = ((high - xPrice)/diff)*height
        let rdsPx = ((high - (xPrice-rds))/diff)*height

        for(let i=0; i<split; i++){
            ctx.beginPath()
            ctx.lineWidth=1
            ctx.moveTo(0, xPx)
            ctx.lineTo(width, xPx)
            ctx.strokeStyle = "blue"
            ctx.stroke()

            ctx.font = '19px Arial'
            ctx.textAlign = 'start'
            ctx.fillStyle = 'blue'
            ctx.fillText(xPrice, ctx_Price_Pos, xPx)

            xPx = ((high - (xPrice-rds))/diff)*height
            xPrice -= rds
        }
    }

    const drawDateAxis = async(data)=>{
        let x = 10;
        let compare = getDate(data[0].date)
        switch(tf){
            case '1h':
                data.forEach((el)=>{
                    let date= getDate(el.date)
                    if(date.Day != compare.Day){
                        compare.Day = date.Day;
                        addDate(date.Day, x, ctx, height , ctx_Date_Pos)
                    }x+=4
                })
            case '1d':
                data.forEach((el)=>{
                    let date=getDate(el.date)
                    if(date.Month!=compare.Month){
                        compare.Month = date.Month;
                        addDate(date.Month, x, ctx, height, ctx_Date_Pos)
                    }x+=4
                }) 
            case '1w':
                data.forEach((el)=>{
                    let date=getDate(el.date)
                    if(date.Month!=compare.Month){
                        compare.Month = date.Month;
                        addDate(date.Month, x, ctx, height, ctx_Date_Pos)
                    }x+=4
                })  
        }
        return (<div></div>)
    }
    drawMain(await scaled)
    drawPriceAxis(await high, await low)
    drawDateAxis(await scaled)
}

const addDate = (time, x, ctx, height, ctx_Date_Pos) => {
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.strokeStyle = "red"
    ctx.stroke()
    //date
    ctx.font = '12px Arial'
    ctx.textAlign = 'start'
    ctx.fillStyle = 'red'
    ctx.fillText(time, x, (height))
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
