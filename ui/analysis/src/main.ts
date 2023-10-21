import Analysis from './analysis'



function app(el: HTMLElement) {
  let a = Analysis.init()

  duckchess24.socket = duckchess24.StrongSocket.init('analysis', {
    receive: (t: string, d: any) => {
      console.log(t, d)
    }
  })


  el.appendChild(a.el)

  a.ss.init()

}


app(document.getElementById('app')!)