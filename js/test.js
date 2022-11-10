var i;
var j;



$("#n-mon").on("click",function(){
    if(value[1]==12){
        lc("calender.html",[1,Number(year)+1])        
    }else{
        lc("calender.html",[Number(value[1])+1,year])
    }
})
$("#b-mon").on("click",function(){
    if(value[1]==1){
        lc("calender.html",[12,year-1])
    }else{
    lc("calender.html",[value[1]-1,year])
    }
})

function lc(hr,arr){
    let script = hr+"?";
    for(var i in arr){
    script=script+"sp"+arr[i]
    }
    location.href = script;
}

 function cl(year = 2022,month=today.getMonth){
    //const week = ["日","月","火","水","木","金","土",""];
    let strage = localStorage.getItem(year+"/"+(month+1))
    let days
    if(strage==null){
        days=0
    }else{
     days=strage.split(",")
    }
    console.log(strage)
    let i7;
    let count=1;
    let count2=1;
    let total=0;
    var numday = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(year%4==0){numday[1]=29}
    for(i = 0;i < month; i++){
        total = total + numday[i]
    }
    console.log(total)
    total = total+Number(year); //'21年12月31日は金曜日(week[5])
    if(2024<year){
        total = total + Math.floor((year-2021)/4);
    }else if(2021>year){
        total=total-Math.floor((2021-year)/4);
    }
    console.log(total)
    total = (total)%7;

    console.log(total)
    var string = "<tr><th id = sun>SUN</th><th id = mon>MON</th><th id = tue>TUE</th><th id = wed>WED</th><th id = thu>THU</th><th id = fri>FRI</th><th id = sat>SAT</th></tr>"
    for(i=0;i<6;i++){
        string=string + "<tr>";
        i7=i*7;
        for(j=0;j<7;j++){
            i7j=i7+j
            if(i7j>=total && i7j<total+numday[month]){


            string=string+"<td><div class=\"goday" 
            if(j==0||j==6){
                string = string +  " red"
            }else{
                string =string + " black"
            }
            for(let k in days){
                if(count==days[k]){
                    string = string+ " bc-g"
                    console.log("bcg")
                }
            }
            string=string+"\" id=\""+count+"/"+j +"\">" + count +"</div></td>";
            count++;
            }else if(i7j>=total+numday[month]){
                if(month==11){
                    string=string+"<td><a href=\"calender.html?sp"+1+"sp"+(Number(year)+1)+"\">"+(count-numday[month])+"</a></td>"
                    
                    count++;
                }else{
                    string=string+"<td><a href=\"calender.html?sp"+(month+2)+"sp"+year+"\">"+(count-numday[month])+"</a></td>"
                    count++;
                }
            }else{
                if(month==0){
                    string=string+"<td><a href=\"calender.html?sp"+12+"sp"+(Number(year)-1)+"\">"+(numday[11]-total+count2)+"</td>"
                    count2++;}else{
                    string=string+"<td><a href=\"calender.html?sp"+month+"sp"+year+"\">"+(numday[month-1]-total+count2)+"</a></td>"
                    count2++    
                }
                
            }
        }
        console.log(count-numday[month])
        string=string+"</tr>";
        if(count>numday[month]){
            break;
        }
    }
    calender.innerHTML="<table>"+string+"</table>";

 }



var value = Array[4]
var str = location.search;
value = str.split("sp");
if(value[1]=="reservation"){
    let savedate = localStorage.getItem(value[2])
    if(savedate==undefined){
        console.log("new")
        localStorage.setItem(value[2],value[3])
    }else{
        console.log("add")
        let div = savedate.split(",")
        let bool = true
        for(i in div){
            if(div[i]==value[3]){
                console.log("既に登録されています")
                bool = false
                break
            }
        }
        if(bool){
            localStorage.setItem(value[2],savedate+","+value[3])
        }
    }


    console.log("checkreservation",value[2],value[3])
    location.href="day.html?/"+value[2]+"/"+value[3]
}else{
    var today = new Date();
    let total = 0;
    console.log(today.getMonth());
    var day=today.getDay();
    var month=today.getMonth();
    var year = today.getFullYear();


    console.log(value[1]);
    if(value[1] == undefined){

        value[2]=year
        value[1]=Number(month)+1
    }
    cl(value[2],value[1]-1)
    console.log(value[1],"/",value[2],value[2])
    console.log(month)
    head.innerHTML=value[2]+"年 "+ value[1]+"月"
    img.innerHTML="<img src=\"img/dog"+value[1]+".jpg\">"
    $(".goday").on("click",function(){
        location.href="day.html?/"+value[2]+"/"+value[1]+"/"+$(this).attr("id");
    })
    $("th").on("click",function(){
        console.log("check")
        var dw = $(this).attr("id")
        var body = document.getElementById("body")
        script = "<h1>"+dw+"</h1>"
        script+="<h2>保存</h2>"
        script+="<div><textarea id=\"textarea\" cols=60 rows=100 value="+localStorage.getItem(dw)+">"
        script+="</textarea></div>"
        
        body.innerHTML=script
        $("h2").on("click",function(){
            localStorage.setItem(dw,textarea.value)
        })
    })
}