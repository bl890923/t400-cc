var date = new Date();
date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
var EndTime = new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' 09:00:00');

//var  EndTime =  new Date("09:00 2014/6/03");
var days = EndTime - new Date();
var Minutes = parseInt(days / 1000); //精确到秒
function show() {
    if (Minutes < 0) {
        EndTime.setDate(new Date().getDate() + 1);
        days = EndTime - new Date();
        Minutes = parseInt(days / 1000);
    } else {

        h = Math.floor(Minutes / 60 / 60);
        m = Math.floor((Minutes - h * 60 * 60) / 60);
        s = Math.floor((Minutes - h * 60 * 60 - m * 60));
        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        // document.getElementById("end").innerHTML = EndTime;
        document.getElementById("HH").innerHTML = h;
        document.getElementById("MM").innerHTML = m;
        document.getElementById("SS").innerHTML = s;
        Minutes--;
    }
}
setInterval("show()", 1000);