import { loadEsm } from './component/assets'
import { StrongSocket } from './component/socket'

export default () => {
  const d = window.duckchess24;

  d.StrongSocket = StrongSocket
  d.loadEsm = loadEsm
}