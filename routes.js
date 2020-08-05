

function home(outlet) {
  document.querySelector(".form-inline").style.display="block";
  loadScript("/components/home/home.component.js");
}

function livereports(outlet) {

  if (!arrayToggle.length) {
    alert('You must select at least one coin!!');
    return;
  }
document.querySelector(".form-inline").style.display="none";
  loadContent('./components/livereports/livereports.component.html', outlet)
  loadScript("/components/livereports/livereports.component.js")
}

function about(outlet) {
  document.querySelector(".form-inline").style.display="none";
  outlet.innerHTML = "<h1>ABOUT</h1>"
  loadContent('./components/about/about.component.html', outlet)
}

function loadContent(url, outlet) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url)
  xhr.onload = function () {
    outlet.innerHTML = xhr.responseText;
  }
  xhr.send()
}

function loadScript(url) {
  const oldScript = document.querySelector('#dynamicScript')
  oldScript?.remove();
  const scriptTag = document.createElement('script');
  scriptTag.id = "dynamicScript"
  scriptTag.src = url;
  document.body.appendChild(scriptTag)
}
export { home, livereports, about }