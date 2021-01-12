window.onload = function () {
    spanColor();
    LoadDate();
}
var color;
//閏年
var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//平常年
var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//年名
var month_name = [
    "January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"
];


var holder = document.getElementById("days");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var ctitle = document.getElementById("calendar-title");
var cyear = document.getElementById("calendar-year");



//New Date :當前的日期时間
//getFullYear() :當前年份
//getMonth() :月份
//getDate() :當前日期
var my_date = new Date();
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
var my_day = my_date.getDate();

//取得1月有幾天
var daysOfMonth = new Date(my_year, my_month, 0).getDate();
//本月第一天是星期幾
var daysOfDay = new Date(my_year, my_month, 1).getDate();



//某年某月第一天是星期幾
function dayStart(month, year) {
    var tmpDate = new Date(year, month, 1);
    return (tmpDate.getDay());
}

//計算某年是不是潤年，年份除以4的餘數
function daysMonth(month, year) {
    var tmp = year % 4;
    if (tmp == 0) {
        return (month_olympic[month]);
    } else {
        return (month_normal[month]);
    }
}


function refreshDate() {
    var str = "";

    //本月總天数
    var totalDay = daysMonth(my_month, my_year);

    //本月第一天是星期幾
    var firstDay = dayStart(my_month, my_year);
    var myclass;


    //日期空白
    for (var i = 1; i < firstDay; i++) {
        str += "<li></li>";
    }
    for (var i = 1; i <= totalDay; i++) {
        if ((i < my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) || my_year <
            my_date.getFullYear() || (my_year == my_date.getFullYear() && my_month < my_date.getMonth())) {

            //今天前日期淺灰色
            myclass = " class='lightgrey'";
        } else if (i == my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) {

            //當天日期背景
            myclass = " class='datebox'";
        } else {

            //今日後深灰字
            myclass = " class='darkgrey'";
        }


        //日期
        str += `<li ${myclass}>${i}<div id='${my_year}-${my_month+1}-${i}'></div></li>`;
    }


    //日曆日期
    holder.innerHTML = str;
    //日曆英文月份
    ctitle.innerHTML = month_name[my_month];
    //日曆年份
    cyear.innerHTML = my_year;
}
//執行
refreshDate();


//上月下月
prev.onclick = function (e) {
    e.preventDefault();
    my_month--;
    if (my_month < 0) {
        my_year--;
        my_month = 11;
    }
    refreshDate();
    LoadDate();
}
next.onclick = function (e) {
    e.preventDefault();
    my_month++;
    if (my_month > 11) {
        my_year++;
        my_month = 0;
    }
    refreshDate();
    LoadDate();
}

let dark;
let create;
//取消鍵
function Cancel() {
    dark = document.getElementById("dark");
    dark.style.display = "none"
}
//增加(增加資料紐)
function Create() {
    dark = document.getElementById("dark");
    dark.style.display = "block"
    let dark_warn = document.getElementById("dark_warn");
    dark_warn.style.display = "none"
    let enter = document.getElementById("enter");
    enter.style.display="inline-block"
    let revise = document.getElementById("revise");
    revise.style.display="none"
}

function WarnBtn() {
    let dark_warn = document.getElementById("dark_warn");
    dark_warn.style.display = "none"
}

function Warn() {
    let dark_warn = document.getElementById("dark_warn");
    dark_warn.style.display = "block"
}
//儲存資料(送出)
function SaveDate() {
    if (document.getElementById("memoDate").value == "" || document.getElementById("memoTime").value == "" || document.getElementById("memoThing").value == "") {
        Warn();
    } else {
        data = localStorage.getItem('calender');
        if (data == null) {
            data = [];
        } else {
            data = JSON.parse(data);
        }
        let temp = {
            Date: document.getElementById("memoDate").value,
            Time: document.getElementById("memoTime").value,
            Thing: document.getElementById("memoThing").value,
            Color: color

        };
        data.push(temp);

        localStorage.setItem('calender', JSON.stringify(data));

        dark = document.getElementById("dark");
        dark.style.display = "none"


        LoadDate();
    }
}

let data;
//資料顯示
function LoadDate() {
    data = localStorage.getItem('calender');
    if (data == null) {
        return;
    }
    data = JSON.parse(data);

    data.forEach(el => {
        let date = new Date(el.Date);
        let id = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        let div = document.getElementById(id);

        div.innerHTML ="";

    });
    data.forEach(el => {
        let date = new Date(el.Date);
        let id = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        let div = document.getElementById(id);


        // div.innerHTML += `<span id='${el.Time}' onclick="Delete(this)" style = "background-color:${el.Color}; ">${el.Time} : ${el.Thing}</span>`

        div.innerHTML += `<span id='${el.Date}${el.Time}' onclick="ShowRevise(this)" style = "background-color:${el.Color}; ">${el.Time} ${el.Thing}<button class="deleteBtn" onclick="Delete(this,event)">x</button></span>`

        

    });

}

function spanColor() {
    
    let d06161 = document.getElementById("d06161")
    d06161.addEventListener("click", function () {
        allColor.forEach(ele => {
            ele.style.border = "none";
            ele.style.boxShadow="none";
        })
        d06161.style.border = "2px solid #ded3d3";
        d06161.style.boxShadow = "rgb(109 100 100) 0px 0px 10px";
        color = "#d06161";
    })


    let e49a45 = document.getElementById("e49a45")
    e49a45.addEventListener("click", function () {
        allColor.forEach(ele => {
            ele.style.border = "none";
            ele.style.boxShadow="none";
        })
        e49a45.style.border = "2px solid #ded3d3";
        e49a45.style.boxShadow = "rgb(109 100 100) 0px 0px 10px";
        color = "#e49a45";
    })


    let afbd73 = document.getElementById("afbd73")
    afbd73.addEventListener("click", function () {
        allColor.forEach(ele => {
            ele.style.border = "none";
            ele.style.boxShadow="none";
        })
        afbd73.style.border = "2px solid #ded3d3";
        afbd73.style.boxShadow = "rgb(109 100 100) 0px 0px 10px";
        color = "#afbd73";
    })



    let a5e9f5 = document.getElementById("a5e9f5")
    a5e9f5.addEventListener("click", function () {
        allColor.forEach(ele => {
            ele.style.border = "none";
            ele.style.boxShadow="none";
        })
        a5e9f5.style.border = "2px solid #ded3d3";
        a5e9f5.style.boxShadow = "rgb(109 100 100) 0px 0px 10px";
        color = "#a5e9f5";
    })


    let a17ab3 = document.getElementById("a17ab3")
    a17ab3.addEventListener("click", function () {
        allColor.forEach(ele => {
            ele.style.border = "none";
            ele.style.boxShadow="none";
        })
        a17ab3.style.border = "2px solid #ded3d3";
        a17ab3.style.boxShadow = "rgb(109 100 100) 0px 0px 10px";
        color = "#a17ab3";
    })

    let allColor = [d06161, e49a45, afbd73, a5e9f5, a17ab3];
    
}
//刪除資料
function Delete(target,event) {
    event.stopPropagation();
    let dataIndex = data.findIndex(x => `${x.Date}${x.Time}` == target.parentNode.id);
    data.splice(dataIndex, 1)
    localStorage.setItem('calender', JSON.stringify(data)); 
    refreshDate();
    LoadDate();

}
let currentId;

//秀出有修改鍵的表
function ShowRevise(target) {
    Create()
    let enter = document.getElementById("enter");
    enter.style.display="none"
    let revise = document.getElementById("revise");
    revise.style.display="inline-block"

    currentId = target.id;
    let temp = data.find(x => `${x.Date}${x.Time}` == target.id);
    document.getElementById("memoDate").value= temp.Date
    document.getElementById("memoTime").value=temp.Time
    document.getElementById("memoThing").value=temp.Thing
    color=temp.Color
    
}


//修改資料
function Revise(){
    let temp = data.find(x => `${x.Date}${x.Time}` == currentId);
    temp.Date=document.getElementById("memoDate").value
    temp.Time=document.getElementById("memoTime").value
    temp.Thing=document.getElementById("memoThing").value
    temp.Color=color

    localStorage.setItem('calender', JSON.stringify(data));
    Cancel();
    refreshDate();
    LoadDate(); 
    
}
