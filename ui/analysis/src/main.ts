import Analysis from './analysis'


function app(el: HTMLElement) {
  let a = Analysis.init()


  el.appendChild(a.el)

}


app(document.getElementById('app')!)