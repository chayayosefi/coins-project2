init();
var arrayToggle = [];
var graphInterval;
clearInterval(graphInterval)
function init() {
    console.log('init')
    const url = "https://api.coingecko.com/api/v3/coins/"
    getData(url, creatAllCoins)
}

function creatAllCoins() {
    let coins = JSON.parse(this.responseText);
    
    let html = coins.map(coin =>
        `
        <div class="row cards" id="${coin.symbol}">
        <div class="card card_${coin.id} col-xs-1 col-sm-10 col-md-3 col-lg-10 row ">
        <div class="custom-control custom-switch" id="toggle${coin.symbol}">
        <input type="checkbox" class="custom-control-input toggle click" id="customSwitch${coins.indexOf(coin)}">
        <label class="custom-control-label" for="customSwitch${coins.indexOf(coin)}"></label></div>
        <div class="card-body" id="${coin.id}">
        <h5 class="card-title">${coin.symbol}</h5><p class="card-text">${coin.id}</p>
        <div class="card-more-${coin.id}"></div>
        <div class="div-btn"><button class="btn btn-primary click" id="${coin.id}">More info</button><button class="btn btn-primary back goBack click" id="${coin.symbol}">Go Back</button></div></div> </div></div>`
    ).join('')
    let CoinsList = document.querySelector('.link-outlet');
    CoinsList.innerHTML = html
    console.log('test1')

    CoinsList.addEventListener('click', addInformation)
}

function addInformation(e) {
    console.log('test')
    // debugger
    let check = e.target.classList
    const id = e.target.id;
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
        let newDiv = e.path[2].children[2];
        let btnMore = e.path[2].children[3].children[0];
        let btnDiv = e.path[2].children[3].children[1];
        newDiv.innerHTML = `
        <img src=${information.image.small}></img>
        <p> USD- ${information.market_data.current_price.usd}&#36</p>
        <p> EUR- ${information.market_data.current_price.eur}&#8364</p>
        <p> ILS- ${information.market_data.current_price.ils}&#8362</p>`;
        btnDiv.classList.remove('back');
        btnMore.disabled = true;
        saveCoin(information)
        document.getElementById(`${information.symbol}`).addEventListener('click', goBack)
    }
}

function checkCountToggle(e) {
    // debugger
    let nameToggle = e.path[1].id.substr(6);
    console.log(arrayToggle.length)
    if (arrayToggle.includes(nameToggle)) {
        arrayToggle = arrayToggle.filter(toggle => toggle !== nameToggle)
    } else if (arrayToggle.length < 5) {
        arrayToggle.push(nameToggle)
        console.log(arrayToggle)

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
    console.log(arrayToggle)
    for (let i = arrayToggle.length - 1; i >= 0; i--) {
        if (!arrayTemp.includes(arrayToggle[i])) {
            document.getElementById(`toggle${arrayToggle[i]}`).children[0].checked = false;
            arrayToggle.splice(i, 1)
            console.log(arrayToggle)
        }
    }
    document.getElementById("myDialog").close();
}
// console.log(arrayToggle)

function closeModal() {
    document.getElementById("myDialog").close()
}

function goBack(e) {
    let divInfo = e.path[2].children[2];
    let btnMore = e.path[2].children[3].children[0];
    let btnDiv = e.path[2].children[3].children[1];

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
        }else if(inputValue===''){
            allCards[i].style.display = 'flex'
 
        } else { allCards[i].style.display = 'none' }
    }
}


