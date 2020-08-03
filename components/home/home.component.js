init();
var arrayToggle = [];
var graphInterval;
clearInterval(graphInterval);

function init() {
    // console.log('init')
    const url = "https://api.coingecko.com/api/v3/coins/"
    getData(url, creatAllCoins)
}

function creatAllCoins() {
    let coins = JSON.parse(this.responseText);

    let html = coins.map(coin => {
    //        return `
    //     <div class="row cards" id="${coin.symbol}">
    //     <div class="card card_${coin.id} col-xs-1 col-sm-10 col-md-3 col-lg-10 row ">
    //     <header class="coinHeader">
    //     <div class="card-body" id="${coin.id}">
    //     <h3 class="card-title">${coin.symbol}</h3>
    //     </header>
    //     <div class="div_toggle custom-control custom-switch" id="toggle${coin.symbol}">
    //     <input type="checkbox" class="custom-control-input toggle click" id="customSwitch${coins.indexOf(coin)}">
    //     <label class="custom-control-label" for="customSwitch${coins.indexOf(coin)}"></label></div>
    //     <h4 class="card-text">${coin.id}</h4>
    //     <div id="card_more_${coin.id}" class="card_more_${coin.id}"></div>
    //     <div class="div-btn"><button onClick="onMoreInfo(this, 'bm_${coin.id}', '${coin}')" class="btn btn-primary click" id="bm_${coin.id}" data-toggle="collapse" data-target="#demo">More info</button><button class="btn btn-primary back goBack click"onClick="goBack(this,'gb_${coin.id}')" id="gb_${coin.id}">Go Back</button></div></div> </div></div>`

    // }).join('')
        return `
        <div class="row cards" id="${coin.symbol}">
        <div class="card card_${coin.id} col-xs-1 col-sm-10 col-md-3 col-lg-10 row ">
        <div class="card-body" id="${coin.id}">
        <div class="custom-control custom-switch" id="toggle${coin.symbol}">
        <input type="checkbox" class="custom-control-input toggle click" id="customSwitch${coins.indexOf(coin)}">
        <label class="custom-control-label" for="customSwitch${coins.indexOf(coin)}"></label></div>
        <h5 class="card-title">${coin.symbol}</h5><p class="card-text">${coin.id}</p>
        <div id="card_more_${coin.id}" class="card_more_${coin.id}"></div>
        <div class="div-btn"><button onClick="onMoreInfo(this, 'bm_${coin.id}', '${coin}')" class="btn btn-primary click" id="bm_${coin.id}" data-toggle="collapse" data-target="#demo">More info</button><button class="btn btn-primary back goBack click"onClick="goBack(this,'gb_${coin.id}')" id="gb_${coin.id}">Go Back</button></div></div> </div></div>`

    }).join('')

    let CoinsList = document.querySelector('.link-outlet');
    CoinsList.innerHTML = html

    if (!CoinsList.hasEvent) {
        CoinsList.addEventListener('click', addInformation)
        CoinsList.hasEvent = true;
    }

    // CoinsList.addEventListener('click', addInformation)
}

function onMoreInfo(event, coinId, coin) {
    // console.log(coinId)
}

function addInformation(e) {
    // console.log(e);
    e.stopPropagation();
    // console.log('test')
    // debugger
    let check = e.target.classList
    let id = e.target.id;
    // console.log(id);
    id=id.slice(3)

    // console.log(id);
    if (id === '' || check.contains('goBack') || !check.contains('click')) {
        return
    }
    if (check.contains('toggle')) {
        checkCountToggle(e);
        return;
    }
    let isExist = checkCoin(id)
    if (isExist === null) {
        getCoin(id)
    } else {
        let coin = localStorage.getItem(id);
        loadInformation((JSON.parse(coin)))
    }

    function getCoin(id) {
        let url = `https://api.coingecko.com/api/v3/coins/${id}`
        getData(url, getApiMoreInfo);
    }

    function getApiMoreInfo() {
        let information = JSON.parse(this.responseText);
        loadInformation(information)
    }
    function loadInformation(information) {
        // console.log(information);
        // console.log(e);
        let idmi=e.target.id
        idmi=idmi.slice(3)
        // let newDiv = e.path[2].children[2];
        let newDiv=document.getElementById("card_more_"+idmi)
        // console.log(newDiv);

        let btnMore = document.getElementById("bm_"+idmi)
        //  let btnMore = document.getElementById("bm-"+id)
        let btnDiv = document.getElementById("gb_"+idmi);
        // console.log(btnDiv);
        newDiv.innerHTML = `
        <img src=${information.image.small}></img>
        <p> USD- ${information.market_data.current_price.usd}&#36</p>
        <p> EUR- ${information.market_data.current_price.eur}&#8364</p>
        <p> ILS- ${information.market_data.current_price.ils}&#8362</p>`;
        btnDiv.classList.remove('back');
        btnMore.disabled = true;
        saveCoin(information)
        // document.getElementById(`${information.symbol}`).addEventListener('click', goBack)
    }
}

function checkCountToggle(e) {
    // debugger
    let nameToggle = e.path[1].id.substr(6);
    // console.log(arrayToggle.length)
    if (arrayToggle.includes(nameToggle)) {
        arrayToggle = arrayToggle.filter(toggle => toggle !== nameToggle)
    } else if (arrayToggle.length < 5) {
        arrayToggle.push(nameToggle)
        // console.log(arrayToggle)
        
    } else if (arrayToggle.length >= 5) {
        let coinsPanel = document.getElementById("coinsPanel")
        coinsPanel.innerHTML =
        `<input type="checkbox" class="myCheck" id="${arrayToggle[0]}" checked><label> ${arrayToggle[0]}</label><br>
        <input type="checkbox" class="myCheck" id="${arrayToggle[1]}" checked><label> ${arrayToggle[1]}</label><br>
        <input type="checkbox" class="myCheck" id="${arrayToggle[2]}" checked><label> ${arrayToggle[2]}</label><br>
        <input type="checkbox" class="myCheck" id="${arrayToggle[3]}" checked><label> ${arrayToggle[3]}</label><br>
        <input type="checkbox" class="myCheck" id="${arrayToggle[4]}" checked><label> ${arrayToggle[4]}</label><br> `
        e.path[1].firstElementChild.checked = false // not allow to make more then 5 toggles
        document.getElementById("myDialog").showModal()
    }
}

function saveChanges() {
    let listCoinsChoose = document.querySelectorAll(".myCheck");
    let arrayTemp = [];
    for (let i = 0; i < listCoinsChoose.length; i++) {
        if (listCoinsChoose[i].checked) {
            arrayTemp.push(listCoinsChoose[i].id)
        }
    }
    // console.log(arrayToggle)
    for (let i = arrayToggle.length - 1; i >= 0; i--) {
        if (!arrayTemp.includes(arrayToggle[i])) {
            document.getElementById(`toggle${arrayToggle[i]}`).children[0].checked = false;
            arrayToggle.splice(i, 1)
            // console.log(arrayToggle)
        }
    }
    document.getElementById("myDialog").close();
}
// console.log(arrayToggle)

function closeModal() {
    document.getElementById("myDialog").close()
}

function goBack(e) {
    let idgb=e.id
    // console.log(idgb);
    idgb=idgb.split("_")[1]
    // console.log(idgb);
    let divInfo = document.getElementById("card_more_"+idgb)
    // console.log(divInfo);
    // console.log(e.path[2].children[3])
    // let btnMore = e.path[2].children[3].children[0];
    let btnMore = document.getElementById("bm_"+idgb)
    // console.log(btnMore);
    let btnDiv = document.getElementById("gb_"+idgb);
    // console.log(btnDiv);

    divInfo.innerHTML = "";
    btnDiv.classList.add('back');
    btnMore.disabled = false;
}

function getData(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', cb);
    xhr.open('GET', url);
    xhr.send();
}

function saveCoin(coin) {
    localStorage.setItem(coin.id, JSON.stringify(coin));
    setTimeout(function () { localStorage.removeItem(coin.id, coin) }, 12000);
}

function checkCoin(id) {
    if (localStorage.getItem(id) === null) {
        return null;
    } else {
        return true;
    }
}

var searchBtn = document.querySelector('#search-btn').addEventListener('click', searchCoin)

function searchCoin(e) {
    e.preventDefault()
    let inputValue = document.querySelector('#searchInput').value.toLowerCase()
    let allCards = document.querySelectorAll('.cards')
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].id === inputValue) {
            allCards[i].style.display = 'flex'
        } else if (inputValue === '') {
            allCards[i].style.display = 'flex'

        } else { allCards[i].style.display = 'none' }
    }
}


