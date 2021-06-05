var year=0,
    month=0,
    day=0,
    date=0, 
    testYear=0,
    testMonth=0,
    testDay=0, 
    testDate=0,
    test= 0, 
    real=0;    


function getDate(el){
    var df = new Date(el * 1000)
    var getYear = df.getFullYear(),
        getMonth = df.getMonth()+1,
        getDay = df.getDate(),
        getDate = getDay + " " + getMonth + " " + getYear;
    return [getYear, getMonth, getDay, getDate]
}
function drawAxis(el, x, ctxTemp_height, ctxTemp_width){
    [testYear, testMonth, testDay, testDate] = getDate(el)
    console.log(testMonth)
    switch(tf){
        case "1h":
            test = testDay,
            real = day;
            break
        case "1d":
            test = testMonth,
            real = month;
            break
        case "1wk":
            test = testMonth,
            real = month;
            break
    }
    if(test != real){
        year=testYear, 
        month=testMonth, 
        day=testDay, 
        date=testDate;

        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.moveTo(x, 0)
        ctx.lineTo(x, ctxTemp_height)
        ctx.strokeStyle = "red"
        ctx.stroke()
        //date
        ctx.font = '9px Arial'
        ctx.textAlign = 'start'
        ctx.fillText(real, x, 475)
    }
}
        