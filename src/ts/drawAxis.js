
 //should be a function at the end of this that checks to see if week or month changed 
    //depending on timeframe
    //if it did, it needs to write at base...
    //also how will it work on scroll
    //we are inside a loop that is re-rendering each mouse tick and it 'should' wor



export const drawAxis = async(el, tf, ctx ) =>{
	console.log(el)
//  switch (tf) {
// 	case "1h":
// 	const test = testDay,
// 		real = day;
// 	break;
// 	case "1d":
// 	(test = testMonth), (real = month);
// 	break;
// 	case "1wk":
// 	(test = testMonth), (real = month);
// 	break;
}








// const getDate = async (el) => {
//   const df = new Date(el * 1000);
//   const getYear = df.getFullYear(),
//     getMonth = df.getMonth() + 1,
//     getDay = df.getDate(),
//     getDate = getDay + " " + getMonth + " " + getYear;
//   console.log(getYear);
//   return [getYear, getMonth, getDay, getDate];
// };
// export async function Pass(el, x, ctxTemp_height, tf) {
//   const can = document.getElementById("can"),
//     ctx = can.getContext("2d");
//   //const [testYear, testMonth, testDay, testDate] = getDate(el)
//   const df = new Date(el * 1000);
//   const testYear = df.getFullYear(),
//     testMonth = df.getMonth() + 1,
//     testDay = df.getDate();
//   switch (tf) {
//     case "1h":
//       const test = testDay,
//         real = day;
//       break;
//     case "1d":
//       (test = testMonth), (real = month);
//       break;
//     case "1wk":
//       (test = testMonth), (real = month);
//       break;
//   }
//   if (test != real) {
//     const year = testYear,
//       month = testMonth,
//       day = testDay,
//       date = testDate;

//     ctx.beginPath();
//     ctx.lineWidth = 1;
//     ctx.moveTo(x, 0);
//     ctx.lineTo(x, ctxTemp_height);
//     ctx.strokeStyle = "red";
//     ctx.stroke();
//     //date
//     ctx.font = "9px Arial";
//     ctx.textAlign = "start";
//     ctx.fillText(real, x, 475);
//   }
//   return <div></div>;
// }
