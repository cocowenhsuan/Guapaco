let Startbutton = document.getElementById("Startbutton")
number_mvs = 0;
let moveBtn = document.getElementById("moveBtn")
let eachChooseBtnV;

Startbutton.addEventListener("click", function () {
    radio()
    puzzle(eachChooseBtnV);
    Start_Game(eachChooseBtnV);
    Switching(eachChooseBtnV);
})






function radio(){
    let choose = document.getElementById('choose');
    // console.log(choose)
    for (let i = 0; i < choose.eachChooseBtn.length; i++) {
        if (choose.eachChooseBtn[i].checked) {
            eachChooseBtnV = parseInt(choose.eachChooseBtn[i].value);
           return eachChooseBtnV;
        
        }
     }
 

}

//拼圖切片
function puzzle(num) {
    if (document.getElementById("container") != null) {
        document.getElementById("container").innerText = ""
    }
    for (var i = 0; i < num * num; i++) {
        document.getElementById("container").innerHTML += `<div class='PicCell' id="Pic${i}"><img src="./SP.png"></div>`
        var row = parseInt(i / num);
        var col = i % num;
        document.querySelector(`#Pic${i}`).setAttribute("style", `width:${(480/num)-2}px; height:${(480/num)-2}px;`)

        document.querySelector(`#Pic${i} img`).setAttribute("style", `margin-left:${col * (-480/num)+1}px; margin-top:${row * (-480/num)+1}px ;`)
    }
    document.querySelector("#Pic0 img").remove();
    beginArr = Array.from(document.querySelectorAll(".PicCell"));
}



let randomArray = [];
//開始打亂拼圖
function Start_Game(num) {
    let massArr = Array.from(document.querySelectorAll(".PicCell"));
    let masspace, massnewIndex;
    for (let i = 0; i < 200; i++) {
        number = Math.floor(Math.random() * num * num);
        masspace = massArr.findIndex(x => x.id == "Pic0");
        massnewIndex = massArr.findIndex(item => item.id == `Pic${number}`)
        if ((massnewIndex + 1) % num == 0) {
            if (massnewIndex - 1 == masspace || massnewIndex + num == masspace || massnewIndex - num == masspace) {
                let masstemp = massArr[masspace];
                massArr[masspace] = massArr[massnewIndex]
                massArr[massnewIndex] = masstemp;
                document.querySelector("#container").innerHTML = "";
                massArr.forEach(x => {
                    document.querySelector("#container").append(x)
                })
            } else {
                continue
            }
        } else if (massnewIndex % num == 0) {
            if (massnewIndex + 1 == masspace || massnewIndex + num == masspace || massnewIndex - num == masspace) {
                masstemp = massArr[masspace];
                massArr[masspace] = massArr[massnewIndex]
                massArr[massnewIndex] = masstemp;
                document.querySelector("#container").innerHTML = "";
                massArr.forEach(x => {
                    document.querySelector("#container").append(x)
                })
            } else {
                continue
            }
        } else if (massnewIndex - 1 == masspace || massnewIndex + 1 == masspace || massnewIndex + num == masspace || massnewIndex - num == masspace) {

            masstemp = massArr[masspace];
            massArr[masspace] = massArr[massnewIndex];
            massArr[massnewIndex] = masstemp;
            document.querySelector("#container").innerHTML = "";
            massArr.forEach(x => {
                document.querySelector("#container").append(x)
            })

            moveBtn.textContent = "Moves: 0";
            number_mvs = 0;
            Startbutton.textContent = "ReStart";
        } else {
            continue
        }

    }
}

let Arr;
//拼圖移動
function Switching(num) {
    Arr = Array.from(document.querySelectorAll(".PicCell"));
    let space;
    let newIndex;

    document.querySelectorAll(".PicCell").forEach((x, index) => {

        x.addEventListener("click", function move() {


            space = Arr.findIndex(x => x.id == "Pic0");
            newIndex = Arr.findIndex(item => item.id == x.id)

            if ((newIndex + 1) % num == 0) {
                if (newIndex - 1 == space || newIndex + num == space || newIndex - num == space) {
                    let temp = Arr[space];
                    Arr[space] = Arr[newIndex]
                    Arr[newIndex] = temp;
                } else {
                    return
                }
            } else if (newIndex % num == 0) {
                if (newIndex + 1 == space || newIndex + num == space || newIndex - num == space) {
                    temp = Arr[space];
                    Arr[space] = Arr[newIndex]
                    Arr[newIndex] = temp;
                } else {
                    return
                }
            } else if (newIndex - 1 == space || newIndex + 1 == space || newIndex + num == space || newIndex - num == space) {

                temp = Arr[space];
                Arr[space] = Arr[newIndex]
                Arr[newIndex] = temp;

            } else {
                return
            }
            document.querySelector("#container").innerHTML = "";
            Arr.forEach(x => {
                document.querySelector("#container").append(x)
            })

            number_mvs++;
            moveBtn.textContent = "Moves: " + number_mvs;
            Startbutton.textContent = "ReStart";



            check_win(num)
        })
    })

}




//勝利
function check_win(num) {
    let temp_val = 0;
    for (let i = 0; i < beginArr.length; i++) {
        if (Arr[i].id == beginArr[i].id) {
            temp_val++
            if (temp_val == beginArr.length) {
                setTimeout(function () {
                    for (let i = 0; i < num * num; i++) {
                        document.getElementById(`Pic${i}`).style.visibility = 'hidden';
                    }
                    document.getElementById('container').style.background = 'url("./Congrats.gif")';
                    document.getElementById('container').style.backgroundSize = "cover"


                    setTimeout(function () {
                        for (let i = 0; i < num * num; i++) {
                            document.getElementById(`Pic${i}`).style.visibility = 'visible';
                            document.getElementById('container').style.background = "#999";
                            Startbutton.textContent = "START";
                            number_mvs = 0;
                            moveBtn.textContent = "Moves: 0";
                        }
                    }, 2000)
                }, 500)


            }
        } else {
            temp_val = 0;
            return
        }
    }
}

