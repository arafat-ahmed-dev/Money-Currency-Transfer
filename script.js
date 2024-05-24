const dropDowns= document.querySelectorAll(".drop-down select");
const btn = document.querySelector("button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const arrowIcon = document.querySelector("i");
const finalMsg = document.querySelector(".final-msg")

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
    if (select.name === from) {
    } else if (select.name === to) {
    }
    select.addEventListener("change", (evt)=> {
        updateFlag(evt.target);
    } )
}
window.addEventListener("load", ()=>{
    getExchangeRate();
});
const updateFlag = async(element) =>{
    const code = element.value;
    let countrycode = countryList[code];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newsrc;
};

async function getExchangeRate() {
    btn.addEventListener("click", async(evt)=> {
        evt.preventDefault();
        finalMsg.innerText = "Getting exchange rate...";
        const amount = document.querySelector("form input");
        let amountVal = amount.value;
        if(amountVal == "" || amountVal == "0" || isNaN(amountVal)){
            amount.value = "1";
            amountVal = 1;
        }
        const url = `https://v6.exchangerate-api.com/v6/7ab68b39e1c40d3f55545c85/latest/${fromCurrency.value}`;
        try {
            const response = await fetch(url);
            const result = await response.json();
            const exchangeRate = result.conversion_rates[toCurrency.value];
            const totalAmount = (amountVal * exchangeRate).toFixed(2);
            finalMsg.innerText = `${amountVal} ${fromCurrency.value} = ${totalAmount} ${toCurrency.value}`;
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
        }
    })
}
arrowIcon.addEventListener("click", ()=>{
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
    [fromCurrency, toCurrency].forEach((select) => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`;
    });
    getExchangeRate();
});