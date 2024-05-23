const dropDowns= document.querySelectorAll(".drop-down select");
const btn = document.querySelector("button")

const apiUrl = 'https://v6.exchangerate-api.com/v6/7ab68b39e1c40d3f55545c85/latest/USD';



for(let select of dropDowns){
    for (code in countryList){
        const option = document.createElement("option");
        option.innerText = code;
        option.value = code;
        if (select.name === "from" && code === "USD") {
            option.selected = "selected";
        } else if (select.name === "to" && code === "BDT"){
            option.selected = "selected";
        }
        select.append(option);
    }
    console.log(select.value);
    if (select.name === from) {
        console.log(`From is selected`);
    } else if (select.name === to) {
        console.log(`From is selected`);
    }
    select.addEventListener("change", (evt)=> {
        updateFlag(evt.target);
    } )
}

const updateFlag = async(element) =>{
    let code = element.value;
    console.log(code);
    let countrycode = countryList[code];
    console.log(countrycode);
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = document.querySelector("img");
    img.src= newsrc;
};
// let icon = document.querySelector("i");
// // icon.addEventListener("click", ()=> {
// //     select.name
// // });