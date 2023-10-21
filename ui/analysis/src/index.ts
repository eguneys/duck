import Analysis from './analysis'

type AnalyseOpts = {

}

export default function main(opts: AnalyseOpts) {

  let a = Analysis.init()

  duckchess24.socket = duckchess24.StrongSocket.init('analysis', {
    receive: (t: string, d: any) => {
      console.log(t, d)
    }
  })

  let el = document.getElementsByTagName('main')[0]

  el.appendChild(a.el)

  a.init()
}