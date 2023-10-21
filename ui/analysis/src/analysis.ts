import { INITIAL_FEN, Shess } from 'shess'
import '../../../public/shess/theme.css'
import '../../../public/shess/kiwen-suwi.css'
import './theme.css'


class Under {
  static init = () => {
    let el = document.createElement('div')
    el.className = 'under'

    let fen_wrap = document.createElement('div')
    fen_wrap.className = 'fen-wrap'
    let fen_tag = document.createElement('label')
    fen_tag.textContent = 'FEN'

    let fen_input = document.createElement('input')
    fen_input.type = 'text'
    fen_input.value = INITIAL_FEN
    fen_input.addEventListener('click', () => {
      fen_input.select()
    })

    fen_wrap.appendChild(fen_tag)
    fen_wrap.appendChild(fen_input)

    el.appendChild(fen_wrap)

    let fen = document.createElement('input')


    return new Under(el)
  }

  constructor(readonly el: HTMLElement) {}
}


export default class Analysis {

  static init = () => {
    let el = document.createElement('div')
    el.className = 'analysis-wrap'

    let ss = Shess.init()
    el.appendChild(ss.el)


    let uu = Under.init()
    el.appendChild(uu.el)

    return new Analysis(el, ss)
  }

  init() {
    this.ss.init()
    this.ss.fen(INITIAL_FEN)
  }

  constructor(readonly el: HTMLElement, readonly ss: Shess) {}
}