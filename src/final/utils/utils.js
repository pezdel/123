
export const windowHighLowPx = async (data, start, windowSize, mainHigh, mainDiff) => {

    const getPlot = async () => {
        let plot = [[]];
        for (let i = start; i < start + windowSize; i++) {
            plot.push(data[i]);
        }
        return plot;
    };

    const getMagHighLow= (magLow, magHigh) => {
        let spaceTop = mainDiff / 100,
            spaceBot = 4;
        const windowLow = Math.ceil((100 - (mainDiff- (mainHigh- magLow)) / spaceTop) * spaceBot)
        const windowHigh = Math.ceil((100 - (mainDiff- (mainHigh- magHigh)) / spaceTop) * spaceBot)

        return [windowLow, windowHigh]
    }


    const plot = getPlot()
    const [magHigh, magLow, magDiff ] = await findHighLow(await plot);
    const [magnifyHigh, magnifyLow] = await getMagHighLow(await magLow, await magHigh)

    return [magnifyHigh, magnifyLow]
}











export const findHighLow = async (data) => {
    let high = 0, 
        low;
    data.forEach((el) => {
        high = el.high > high ? el.high : high;
        low = !low || el.low < low ? el.low : low;
    });
    const diff = high-low
    return [high, low, diff];
};

export const scale = (data, high, diff, height) => {
    const plot = data.map((el) => {
        return {
            low: ((high - el.low) / diff) * height,
            high: ((high - el.high) / diff) * height,
            open: ((high - el.open) / diff) * height,
            close: ((high - el.close) / diff) * height,
            date: el.date,
        };
    });
    return plot;
};

export const getDate = (date) => {
    let df = new Date(date * 1000)
    let Year = df.getFullYear(),
        Month = df.getMonth()+1,
        Day = df.getDate()
    //getDate = getDay + " " + getMonth + " " + getYear;
    return {Year, Month, Day}
}

export const getP = async (p) => {
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

export const roundedSpace = async (diffSpace, high) => {
    let rds;
    let startSpot;

    if(diffSpace<1){
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


