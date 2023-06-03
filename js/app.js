const dropList = document.querySelectorAll(".list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for(let i = 0; i < dropList.length; i++) {
    for(currency_code in country_code){
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "CAD" ? "selected" : "";
        }
        // 通貨コードをテキストとvalueとして渡すオプションタグの作成
        let optionTag = `<option value="${currency_code}">${currency_code}</option>`
        //insert options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(code in country_code){
        if(code == element.value){
            let imgFlag = element.parentElement.querySelector("img");
            imgFlag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`
        }
    }
}
window.addEventListener("load", () =>{
    getExchangeRate();
});
getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".icon");
exchangeIcon.addEventListener("click", () =>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});


function getExchangeRate(){
    const amount = document.querySelector("#amountInput");
    const exchangeRateTxt = document.querySelector("#result");
    let amountVal =amount.value;
    if(amountVal =="" || amountVal == "0"){
        amount.value = "1";
        amountVal=1;
    }
    exchangeRateTxt.innerText = "Getting Exchange Rate";
    const apiKey = `047130fa4580d541a6448feb`;
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something went wrong";
    });
}

