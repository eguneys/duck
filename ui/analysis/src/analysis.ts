import { Shess } from 'shess'


export default class Analysis {

  static init = () => {
    let el = document.createElement('analysis-wrap')



    let ss = Shess.init()

    el.appendChild(ss.el)

    return new Analysis(el)
  }

  constructor(readonly el: HTMLElement) {}
}