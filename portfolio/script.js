(function() {

    let el_mail = document.querySelector("#mail-div");
    el_mail.addEventListener("click",()=> copyMail());

    let el_tel = document.querySelector("#tel-div");
    el_tel.addEventListener("click",()=> copyTel());

    show();//!!!!!!!!!!!!
    
    notification("Доброго времени суток!");

})();

async function show(){

    await new Promise((resolve)=>{
        setTimeout(()=> resolve(), 300);
    });

    let el_items = document.querySelectorAll(".main--add-in-item");

    for(let el of el_items){
        el.style.animation = "openW 0.5s ease-out 0s forwards"; // ширина item
        el.children[1].style.animation = "openH 0.5s ease-out 0.5s forwards"; //высота item-in // по другому ?
        el.children[0].classList.remove("close");
        el.children[0].classList.add("open");
        // await new Promise((resolve)=>{
        //     setTimeout(()=> {resolve()}, 0);
        // });
    }
}

function copyMail(){
    let el = document.querySelector("#mail")
    navigator.clipboard.writeText(el.innerHTML);
    notification("Адрес почты скопирован!");
}
function copyTel(){
    let el = document.querySelector("#tel")
    navigator.clipboard.writeText(el.innerHTML.replaceAll("-",""));
    notification("Номер телефона скопирован!");
}

async function notification(text){
    let doc = document.querySelector("#notification");
    let time = 1;
    let delay = 700;
    doc.style.display = "block";
    doc.children[0].innerHTML = text;
    let promise = new Promise((resolve, reject)=>{
        doc.style.animation = `show ${time}s ease-in 0s forwards`;
        setTimeout(()=>{
            resolve();
        }, time * 1000 + delay);
    });
    promise.then(()=>{
        doc.style.animation = `hide ${time}s ease-in 0s forwards`;
    })
}

function add_in_item_open(btn, i){

    let el = document.querySelectorAll(".main--add-in-item")[i];

    if(btn.classList.contains("close")) {
        el.style.animation = "openW 0.5s ease-in 0s forwards"; // ширина item
        el.children[1].style.animation = "openH 0.5s ease-in 0.5s forwards"; //высота item-in // по другому ?
        // el.style.transform = "translateX(50px)";
        btn.classList.remove("close"); btn.classList.add("open");
    }
    else{
        el.children[1].style.animation = "closeH 0.5s ease-out 0s forwards";
        el.style.width = "100%"; //??????? kak rabotaet? Первая операция обнуляет на время значения блока?
        el.style.animation = "closeW 0.5s ease-in-out 0.5s forwards";
        btn.classList.remove("open"); btn.classList.add("close");
    }

}

function add_in_items_open(btn){
    let items = document.querySelectorAll(".main--add-in-item");
    console.log(items);
    let i = 0;
    for(let item of items){
        add_in_item_open(item.children[0], i);
        i++;
    }
}