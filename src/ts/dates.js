import React, { useRef, useState } from 'react'
//import useState from "react-usestateref";

const getDate = async (el) => {
	const df = new Date(el * 1000)
	const getYear = df.getFullYear(),
		getMonth = df.getMonth()+1,
		getDay = df.getDate(),
		getDate = getDay + " " + getMonth + " " + getYear;
	console.log(getYear)
	return [getYear, getMonth, getDay, getDate];
	}
export async function DrawAxis(el, x, ctxTemp_height){
	const [ date, setDate ] = useState([])
	setDate(await getDate(el))
	console.log(date)
	// console.log(testMonth)
	// switch(tf){
	// 	case "1h":
	// 	test = testDay,
	// 	real = day;
	// 	break
	// 	case "1d":
	// 	test = testMonth,
	// 	real = month;
	// 	break
	// 	case "1wk":
	// 	test = testMonth,
	// 	real = month;
	// 	break
	// }
	// if(test != real){
	// 	year=testYear, 
	// 	month=testMonth, 
	// 	day=testDay, 
	// 	date=testDate;

	// 	ctx.beginPath()
	// 	ctx.lineWidth = 1
	// 	ctx.moveTo(x, 0)
	// 	ctx.lineTo(x, ctxTemp_height)
	// 	ctx.strokeStyle = "red"
	// 	ctx.stroke()
	// 	//date
	// 	ctx.font = '9px Arial'
	// 	ctx.textAlign = 'start'
	// 	ctx.fillText(real, x, 475)
	// }
	return(<div></div>)
	}
