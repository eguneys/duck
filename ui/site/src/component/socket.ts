interface Settings {
  receive?:   (t: string, d: any) => void;
}


export class StrongSocket {
  static init = (path: string, settings: Settings) => {

    let socket = new WebSocket(`ws://localhost:8080/ws/${path}`)

    let res = new StrongSocket(socket, settings)



    socket.addEventListener('open', res.on_open)
    socket.addEventListener('message', res.on_message)
    socket.addEventListener('close', res.on_close)
    socket.addEventListener('error', res.on_error)

    res
  }

  constructor(readonly socket: WebSocket, 
    readonly settings: Settings) {}

  send = (data: any) => {
    this.socket.send(data)
  }

  on_open = (_e: Event) => {
    console.log('Websocket opened')
  }
  
  on_message = (e: MessageEvent) => {
    console.log('message', e.data)
  }

  on_close = (e: CloseEvent) => {
    console.log('closed', e)
  }

  on_error = (e: Event) => {
    console.error('ws error: ', e)
  }

}