


var can = document.getElementById("can"),
ctx = can.getContext('2d')
var plot = []

function draw(plot){
    ctx.clearRect(0,0,700,500)
    date = 0
    var x=10, 
        ctxTemp_width = can.width,
        ctxTemp_height = can.height;
    plot.forEach(el => {
        if (el.open > el.close){
            ctx.strokeStyle = 'green'
        }
        else{
            ctx.strokeStyle = 'red'
        }
        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.moveTo(x, el.high)
        ctx.lineTo(x, el.low)
        ctx.strokeStyle
        ctx.stroke()
        
        
        ctx.beginPath()
        ctx.lineWidth =3
        ctx.moveTo(x, el.open)
        ctx.lineTo(x, el.close)
        ctx.strokeStyle
        ctx.stroke()
        x+=4
        drawAxis(el.date, x, ctxTemp_height, ctxTemp_width)

    })
}