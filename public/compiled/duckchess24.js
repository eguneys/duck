var d = Object.defineProperty;
var a = (s, e, n) => e in s ? d(s, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : s[e] = n;
var o = (s, e, n) => (a(s, typeof e != "symbol" ? e + "" : e, n), n);
const i = (s, e = {}) => (e = e || {}, "" + "/assets/" + s), u = (s) => `compiled/${s}${document.body.dataset.dev ? "" : ".min"}.js`;
async function m(s, e) {
  const n = await import(i(u(s), e == null ? void 0 : e.url));
  return n.initModule ? n.initModule(e == null ? void 0 : e.init) : n.default(e == null ? void 0 : e.init);
}
const r = class r {
  constructor(e, n) {
    o(this, "send", (e) => {
      this.socket.send(e);
    });
    o(this, "on_open", (e) => {
      console.log("Websocket opened");
    });
    o(this, "on_message", (e) => {
      console.log("message", e.data);
    });
    o(this, "on_close", (e) => {
      console.log("closed", e);
    });
    o(this, "on_error", (e) => {
      console.error("ws error: ", e);
    });
    this.socket = e, this.settings = n;
  }
};
o(r, "init", (e, n) => {
  let t = new WebSocket(`ws://localhost:8080/ws/${e}`), c = new r(t, n);
  t.addEventListener("open", c.on_open), t.addEventListener("message", c.on_message), t.addEventListener("close", c.on_close), t.addEventListener("error", c.on_error);
});
let l = r;
const w = () => {
  const s = window.duckchess24;
  s.StrongSocket = l, s.loadEsm = m;
};
w();
