//localStorage.setItem("2020/12/23","ab")

//　　　変数宣言
var textarea = document.getElementById("textarea")
var header = document.getElementById("header")
var week = document.getElementById("week")
var query = location.search
var dow = ["sun","mun","tue","wed","thu","fri","sat"]





//　　　ページが開かれた時の処理
console.log(query)
ymd=query.split("/")
header.innerHTML=ymd[1]+"年"+ymd[2]+"月"+ymd[3]+"日"
week.innerHTML=localStorage.getItem(dow[ymd[4]])
console.log(localStorage.getItem(dow[ymd[4]]))
textarea.value=localStorage.getItem(query)




//　　　反応
$("#save").on("click",function(){
    localStorage.setItem(query,textarea.value)
    console.log("save")
    //隠しコマンド
    if(textarea.value=="all-clear00"){
        console.log("clear")
        localStorage.clear()
    }
})
$("#reservation").on("click",function(){
    console.log("reservation")
    location.href="calender.html?spreservationsp"+ymd[1]+"/"+ymd[2]+"sp"+ymd[3]
})