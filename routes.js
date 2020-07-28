

function home(outlet) {
      loadScript("/components/home/home.component.js");          
  }
  
  function livereports(outlet) {
      loadContent('./components/livereports/livereports.component.html', outlet)
      loadScript("/components/livereports/livereports.component.js")
  }

  function about(outlet) {
      outlet.innerHTML = "<h1>ABOUT</h1>"
      loadContent('./components/about/about.component.html', outlet)
    //   loadScript('./components/about/about.component.js')  
  }
  
  function loadContent(url, outlet) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET' , url)
      xhr.onload = function() {
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
  export { home , livereports , about }