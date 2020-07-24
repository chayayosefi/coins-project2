
import { home, livereports, about } from './routes.js'


const outlet = document.querySelector('.link-outlet')
const routes = {
    home,
    livereports,
    about
}

window.onload = function () {
    routes['home'](outlet)
    init();
}


function init() {
    document.querySelector('nav > ul').addEventListener('click', selectRoute);
document.body.style.backgroundImage="url('background2.png')"
}

function selectRoute(event) {
    event.preventDefault();
    if (event.target.nodeName !== "A") {
        return
    }

    let e = event.target.textContent.toLowerCase()
    let newE = e.replace(/ /g, '')
     if (newE === 'search') {
        searchCoin(e)
    }
    routes[newE](outlet)
}




