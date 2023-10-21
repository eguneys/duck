var me = Object.defineProperty;
var ve = (i, e, t) => e in i ? me(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var j = (i, e, t) => (ve(i, typeof e != "symbol" ? e + "" : e, t), t);
var ge = Object.defineProperty, we = (i, e, t) => e in i ? ge(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, _ = (i, e, t) => (we(i, typeof e != "symbol" ? e + "" : e, t), t);
class ke {
  constructor() {
    _(this, "dests", {}), _(this, "selected"), _(this, "set_dests"), _(this, "last_moves");
  }
  can_dest(e, t) {
    var s;
    return (s = this.dests[e]) == null ? void 0 : s.includes(t);
  }
  last_move(e) {
    this.clear_last_moves(), e.length > 0 && (this.last_moves = e, x.add_klass("last-move", e));
  }
  clear_last_moves() {
    this.last_moves && (x.remove_klass("last-move", this.last_moves), this.last_moves = void 0);
  }
  select_piece(e) {
    this.deselect();
    let t = this.dests[e];
    t && (x.add_klass("dest", t), this.set_dests = t), this.selected = e, x.add_klass("selected", [e]);
  }
  deselect() {
    this.selected && (x.remove_klass("selected", [this.selected]), this.selected = void 0), this.set_dests && (x.remove_klass("dest", this.set_dests), this.set_dests = void 0);
  }
}
class le {
  constructor(e, t, s) {
    this.el = e, this.key = t, this.on_remove = s;
  }
}
_(le, "init", (i) => {
  let e = document.createElement("square"), t = k.key_to_coord(i);
  e.style.transform = `translate(${t[0] * 100}%, ${t[1] * 100}%)`;
  let s = {
    key: i,
    el: e,
    add_klass(a) {
      e.classList.add(a);
    },
    remove_klass(a) {
      e.classList.remove(a), setTimeout(() => {
        (e.classList.length === 0 || e.classList.length === 1 && e.classList.contains("occupied")) && x.pop(s);
      });
    }
  };
  q.get_piece_by_key(i) && e.classList.add("occupied"), x.push(s);
});
const z = class {
  constructor(e) {
    _(this, "cbs", []), this.el = e;
  }
  add_klass(e, t) {
    let s = this.cbs.map((a) => a.key);
    t.filter((a) => !s.includes(a)).forEach((a) => le.init(a)), this.cbs.filter((a) => t.includes(a.key)).forEach((a) => a.add_klass(e));
  }
  remove_klass(e, t) {
    this.cbs.filter((s) => t.includes(s.key)).forEach((s) => s.remove_klass(e));
  }
  push(e) {
    this.cbs.push(e), this.el.prepend(e.el);
  }
  pop(e) {
    let [t] = this.cbs.splice(this.cbs.indexOf(e), 1);
    t.el.remove();
  }
};
_(z, "init", () => new z(E.pieces));
let be = z;
class Ee {
  constructor() {
    _(this, "_hl", [8, 7, 6, 5, 4, 3, 2, 1]);
  }
  key_to_coord(e) {
    return [this.files.indexOf(e[0]), this.ranks.indexOf(e[1])];
  }
  coord_to_key(e) {
    return this.files[e[0]] + this.ranks[e[1]];
  }
  get files() {
    let e = "abcdefgh".split("");
    return this.lh.map((t) => e[t - 1]);
  }
  get ranks() {
    let e = "12345678".split("");
    return this.lh.map((t) => e[t - 1]);
  }
  get lh() {
    return this.hl.reverse();
  }
  get hl() {
    return this._hl.slice(0);
  }
  flip() {
    this._hl.reverse();
  }
}
const D = (i, e) => i[0] === e[0] && i[1] === e[1], w = (i) => [
  Math.max(0, Math.min(7, Math.floor(i[0] / (1 / 8)))),
  Math.max(0, Math.min(7, Math.floor(i[1] / (1 / 8))))
], K = () => b.ctrl ? "red" : b.shift ? "blue" : b.alt ? "yellow" : "green";
class xe {
  constructor() {
    _(this, "_down"), _(this, "_move"), _(this, "_up"), _(this, "d");
  }
  set down(e) {
    this._up = void 0, this._down = e, this.d.on_down(e[0], e[1]);
  }
  set move(e) {
    this._down && (D(w(this._down), w(e)) || (this._move = e, this._down && this._move && this.d.on_move(this._down[0], this._down[1], this._move[0], this._move[1])));
  }
  set up(e) {
    this._down && this._move ? this.d.on_move_end(this._down[0], this._down[1], this._move[0], this._move[1]) : this.d.on_down_end(e[0], e[1]), this._up = e, this._move = void 0, this._down = void 0;
  }
}
function ye(i, e, t, s) {
  let a = t - i, r = s - e, d = Math.sqrt(a * a + r * r), l = a / d, f = r / d, o = 1.6, c = -f * o * 0.66, h = l * o * 0.66, n = [t + c, s + h], p = [t - c, s - h], m = [t + l * o, s + f * o];
  return `${n[0]},${n[1]} ${p[0]},${p[1]} ${m[0]},${m[1]}`;
}
const X = class {
  constructor(e, t) {
    this.svg = e, this.get_export = t;
  }
  get export() {
    return this.get_export();
  }
};
_(X, "init", (i, e) => {
  let t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  t.setAttribute("width", "100%"), t.setAttribute("height", "100%"), t.setAttribute("viewBox", "0 0 100 100");
  let s = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  t.appendChild(s), s.setAttribute("fill", "none");
  function a([l, f]) {
    s.setAttribute("cx", `${l * 100}`), s.setAttribute("cy", `${f * 100}`), s.setAttribute("r", `${100 / 16 - 1}`);
  }
  function r([l, f]) {
    s.setAttribute("stroke", l), s.setAttribute("stroke-width", `${f}`);
  }
  a(i), r(e);
  const d = () => [i.map((l) => Math.floor(l * 8)), e[0]];
  return new X(t, d);
});
let ne = X;
const H = class {
  constructor(e, t) {
    this.svg = e, this.get_export = t;
  }
  get export() {
    return this.get_export();
  }
};
_(H, "init", (i, e) => {
  let t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  t.setAttribute("width", "100%"), t.setAttribute("height", "100%"), t.setAttribute("viewBox", "0 0 100 100");
  let s = document.createElementNS("http://www.w3.org/2000/svg", "line");
  t.appendChild(s);
  let a = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  t.appendChild(a);
  function r([o, c, h, n]) {
    s.setAttribute("x1", `${o * 100}`), s.setAttribute("y1", `${c * 100}`), s.setAttribute("x2", `${h * 100}`), s.setAttribute("y2", `${n * 100}`), a.setAttribute("points", ye(o * 100, c * 100, h * 100, n * 100));
  }
  function d([o, c]) {
    s.setAttribute("stroke", o), s.setAttribute("stroke-width", `${c}`), a.setAttribute("stroke", o), a.setAttribute("stroke-width", `${c}`);
  }
  let l = [0, 0, 0, 0];
  typeof i == "function" ? i(r) : (y.pos({
    start: [i[0], i[1]],
    end: w([i[0], i[1]]).map((o) => o / 8 + 0.5 / 8),
    dur: 0.26,
    update: ([o, c]) => {
      l[0] = o, l[1] = c, r(l);
    }
  }), y.pos({
    start: [i[2], i[3]],
    end: w([i[2], i[3]]).map((o) => o / 8 + 0.5 / 8),
    dur: 0.26,
    update: ([o, c]) => {
      l[2] = o, l[3] = c, r(l);
    }
  })), typeof e == "function" ? e(d) : d(e);
  const f = () => {
    if (typeof i == "function" || typeof e == "function")
      return [[0, 0, 0, 0], "green"];
    let o = w([i[0], i[1]]), c = w([i[2], i[3]]);
    return [[...o, ...c], e[0]];
  };
  return new H(t, f);
});
let ae = H;
const U = class {
  constructor(e, t) {
    _(this, "pcbs", []), this.el = e, this.on_clear = t;
  }
  pull_arrows(e) {
    this.pcbs.push(e);
  }
  push_arrows(e) {
    this.pcbs.forEach((t) => t(e));
  }
  clear() {
    this.on_clear();
  }
};
_(U, "init", () => {
  let i = document.createElement("arrows"), e, t = !1, s, a, r = ae.init((h) => {
    s = h;
  }, (h) => a = h), d = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  O.d = {
    on_down(h, n) {
      e && e.svg.remove(), e = ne.init([h, n], [K(), 1]), i.appendChild(e.svg);
    },
    on_down_end(h, n) {
      if (e) {
        let p = w([h, n]).join("-");
        if (l.has(p))
          l.get(p).svg.remove(), l.delete(p), c();
        else {
          let m = ne.init(w([h, n]).map((g) => g / 8 + 0.0625), [K(), 1.2]);
          i.appendChild(m.svg), l.set(p, m), c();
        }
        e.svg.remove(), e = void 0;
      }
    },
    on_move(h, n, p, m) {
      e && (e.svg.remove(), e = void 0), t || (i.appendChild(r.svg), t = !0), s == null || s([h, n, p, m]), a([K(), 1]);
    },
    on_move_end(h, n, p, m) {
      t && (r.svg.remove(), t = !1);
      let g = [...w([h, n]), ...w([p, m])].join("-");
      if (d.has(g))
        d.get(g).svg.remove(), d.delete(g), c();
      else {
        let A = ae.init([h, n, p, m], [K(), 1.21]);
        i.appendChild(A.svg), d.set(g, A), c();
      }
    }
  };
  const f = () => {
    for (let h of l.values())
      h.svg.remove();
    for (let h of d.values())
      h.svg.remove();
    d.clear(), l.clear(), c();
  };
  let o = new U(i, f);
  function c() {
    let h = [...d.values()].map((p) => p.export), n = [...l.values()].map((p) => p.export);
    o.push_arrows({ arrows: h, circles: n });
  }
  return o;
});
let Ce = U;
class re {
  init() {
  }
  flip() {
  }
  random() {
  }
  shake() {
  }
  snap() {
  }
  fen(e) {
    console.log(e);
  }
  clear() {
  }
}
_(re, "init", (i) => {
  let e = i.toUpperCase() === i ? "white" : "black", t = "pawn";
  switch (i.toUpperCase()) {
    case "R":
      t = "rook";
      break;
    case "N":
      t = "knight";
      break;
    case "B":
      t = "bishop";
      break;
    case "Q":
      t = "queen";
      break;
    case "K":
      t = "king";
      break;
    case "P":
      t = "pawn";
      break;
    case "D":
      t = "duck";
      break;
  }
  let s = document.createElement("piece");
  s.classList.add(e, t);
  let a, r = [0, 0], d = 1, l = 0;
  const f = () => {
    s.style.transform = `translate(${r[0] * 800}%, ${r[1] * 800}%)       scale(${d})       rotate(${l}rad)`;
  }, o = (u) => {
    r = u, f();
  }, c = (u) => {
    d = u[0], l = u[1], f();
  }, h = (u) => {
    y.cancel();
    let v = 0.8, C = [
      r[0] * (1 - v) + u[0] * v,
      r[1] * (1 - v) + u[1] * v
    ];
    o(C);
  }, n = (u) => {
    y.pos({
      start: r,
      end: u,
      dur: 0.26,
      update: o
    });
  }, p = (u) => {
    y.pos({
      start: r,
      end: u,
      dur: 0.16,
      update: o
    });
  };
  let m = {
    start: [d, l],
    end: [0.9, Pe],
    dur: 0.2,
    update: c
  };
  const g = () => {
    m.start = [d, l], F.pos(m);
  }, A = () => {
    F.cancel_one(m), F.pos({
      start: [d, l],
      end: [1, 0],
      dur: 0.1,
      update: c
    });
  };
  let W = () => [i, [Math.ceil((r[0] + 0.5 / 8) * 8), Math.ceil((r[1] + 0.5 / 8) * 8)]], N = {
    q_ch: W,
    on_x_hover: function() {
      g();
    },
    on_x_hov_end: function() {
      A();
    },
    on_x_drop: function() {
      ie();
    }
  }, Z = {
    q_ch: W,
    translate: function(u) {
      p(u);
    },
    drop() {
      ie();
    }
  }, G = r, ee = {
    q_pos: () => [r[0] + 0.5 / 8, r[1] + 0.5 / 8],
    on_click: function(u) {
      y.cancel(), p(w(u).map((v) => v / 8));
    },
    on_hover: function(u) {
      u = [u[0] - 0.5 / 8, u[1] - 0.5 / 8];
    },
    on_down: function(u) {
      let v = w(u);
      G = v;
      let C = k.coord_to_key(v);
      u = [u[0] - 0.5 / 8, u[1] - 0.5 / 8], p(u), $.select_piece(C), s.classList.add("drag");
    },
    on_drag: function(u) {
      u = [u[0] - 0.5 / 8, u[1] - 0.5 / 8], h(u), P.on_drag(N);
    },
    on_drop: function(u) {
      y.cancel();
      let v = G, C = w(u);
      q.push_fen(), $.can_dest(k.coord_to_key(v), k.coord_to_key(C)) ? (p(C.map((T) => T / 8)), P.on_drop(N), $.last_move([k.coord_to_key(v), k.coord_to_key(C)])) : p(v.map((T) => T / 8)), s.classList.remove("drag"), $.deselect();
    }
  };
  const ce = () => {
    te();
  }, pe = () => {
    n([7 / 8 - r[0], 7 / 8 - r[1]]);
  }, te = () => {
    p([Math.random() * (1 - 1 / 8), Math.random() * (1 - 1 / 8)]);
  }, de = () => {
    g();
  }, se = (u) => {
    let v = u % 0.125;
    return v < 1 / 8 - v ? u - v : u + 1 / 8 - v;
  }, ue = () => {
    p([se(r[0]), se(r[1])]), A();
  }, _e = (u) => {
    console.log(u);
  }, ie = () => {
    P.pop(N), q.pop(Z), M.pop(ee), E.pop(a);
  }, fe = () => {
    P.push(N), q.push(Z), M.push(ee), E.push(a);
  };
  a = {
    el: s,
    init: ce,
    flip: pe,
    random: te,
    shake: de,
    snap: ue,
    fen: _e,
    clear() {
    }
  }, fe();
});
class $e {
  constructor() {
    _(this, "ps", []), _(this, "ranks"), this.ranks = document.createElement("ranks");
  }
  push(e) {
    this.ps.push(e), this.ranks.appendChild(e.el);
  }
  flip() {
    this.ps.forEach((e) => e.flip());
  }
}
class qe {
  constructor() {
    _(this, "ps", []), _(this, "files"), this.files = document.createElement("files");
  }
  push(e) {
    this.ps.push(e), this.files.appendChild(e.el);
  }
  flip() {
    this.ps.forEach((e) => e.flip());
  }
}
class Ae {
  constructor() {
    _(this, "recycle", []), _(this, "ps", []), _(this, "pieces"), this.pieces = document.createElement("pieces");
  }
  pop(e) {
    let t = this.ps.indexOf(e);
    t > -1 && (this.pieces.removeChild(e.el), this.ps.splice(t, 1));
  }
  push(e) {
    this.ps.push(e), this.pieces.append(e.el);
  }
  random() {
    this.ps.forEach((e) => e.random());
  }
  shake() {
    this.ps.forEach((e) => e.shake());
  }
  snap() {
    this.ps.forEach((e) => e.snap());
  }
  fen(e) {
    this.ps.forEach((t) => t.fen(e));
  }
  init() {
    this.ps.forEach((e) => e.init());
  }
  flip() {
    this.ps.forEach((e) => e.flip());
  }
  clear() {
  }
}
const Y = class {
  constructor(e, t) {
    this.el = e, this.ux = t;
  }
  last_move(e) {
    $.last_move(e);
  }
  dests(e) {
    $.dests = e;
  }
  init() {
    this.ux.init();
  }
  flip() {
    this.ux.flip();
  }
  random() {
    this.ux.random();
  }
  shake() {
    this.ux.shake();
  }
  snap() {
    this.ux.snap();
  }
  fen(e) {
    this.ux.fen(e);
  }
  clear() {
    this.ux.clear();
  }
  pull_arrows(e) {
    S.pull_arrows(e);
  }
  pull_fen(e) {
    q.pull_fen(e);
  }
};
_(Y, "init", () => {
  let i = document.createElement("shess");
  i.classList.add("is2d");
  let { ranks: e } = Q, { files: t } = I, { pieces: s } = E;
  i.appendChild(t), i.appendChild(e);
  let a = document.createElement("board");
  i.appendChild(a), a.appendChild(s), a.appendChild(S.el);
  let r;
  const d = () => {
    r = a.getBoundingClientRect();
  };
  d(), window.addEventListener("resize", d), window.addEventListener("scroll", d);
  function l(n) {
    return [(n.clientX - r.left) / r.width, (n.clientY - r.top) / r.height];
  }
  const f = (n, p) => {
    b.ctrl = n.ctrlKey, b.alt = n.altKey, b.shift = n.shiftKey, M.move = p, O.move = p;
  }, o = (n, p) => {
    b.ctrl = n.ctrlKey, b.alt = n.altKey, b.shift = n.shiftKey, n.button === 0 ? (S.clear(), M.down = p) : O.down = p;
  }, c = (n, p) => {
    M.up = p, O.up = p;
  };
  document.addEventListener("mousemove", (n) => f(n, l(n))), document.addEventListener("mousedown", (n) => o(n, l(n))), document.addEventListener("mouseup", (n) => c(n, l(n))), document.addEventListener("contextmenu", (n) => n.preventDefault()), "12345678".split("").map((n) => {
    let p = document.createElement("rank"), m = document.createTextNode(n);
    p.appendChild(m);
    const g = () => {
      switch (n) {
        case "1":
          n = "8";
          break;
        case "2":
          n = "7";
          break;
        case "3":
          n = "6";
          break;
        case "4":
          n = "5";
          break;
        case "5":
          n = "4";
          break;
        case "6":
          n = "3";
          break;
        case "7":
          n = "2";
          break;
        case "8":
          n = "1";
          break;
      }
      m.textContent = n;
    };
    Q.push({
      el: p,
      flip: g
    });
  }), "abcdefgh".split("").map((n) => {
    let p = document.createElement("file"), m = document.createTextNode(n);
    p.appendChild(m);
    const g = () => {
      switch (n) {
        case "a":
          n = "h";
          break;
        case "b":
          n = "g";
          break;
        case "c":
          n = "f";
          break;
        case "d":
          n = "e";
          break;
        case "e":
          n = "d";
          break;
        case "f":
          n = "c";
          break;
        case "g":
          n = "b";
          break;
        case "h":
          n = "a";
          break;
      }
      m.textContent = n;
    };
    I.push({
      el: p,
      flip: g
    });
  });
  let h = {
    init: () => {
      E.init(), d();
    },
    flip: () => {
      y.imm_end(), k.flip(), I.flip(), Q.flip(), E.flip();
    },
    random: () => {
      E.random();
    },
    shake: () => {
      E.shake();
    },
    snap: () => {
      E.snap();
    },
    fen: (n) => {
      q.fen(n);
    },
    clear: () => {
      S.clear();
    }
  };
  return new Y(i, h);
});
let Me = Y;
class Le {
  constructor() {
    _(this, "ps", []), _(this, "_hovering");
  }
  pop(e) {
    let t = this.ps.indexOf(e);
    t > -1 && this.ps.splice(t, 1);
  }
  push(e) {
    this.ps.push(e);
  }
  on_drag(e) {
    let t;
    for (let s of this.ps)
      if (s !== e && L(e.q_ch()[1], s.q_ch()[1]) < 0.5) {
        t = s;
        break;
      }
    t ? this._hovering ? this._hovering != t && (this._hovering.on_x_hov_end(), this._hovering = t, this._hovering.on_x_hover()) : (this._hovering = t, this._hovering.on_x_hover()) : this._hovering && (this._hovering.on_x_hov_end(), this._hovering = void 0);
  }
  on_drop(e) {
    for (let t of this.ps)
      if (t !== e && L(e.q_ch()[1], t.q_ch()[1]) < 0.5) {
        t.on_x_drop();
        break;
      }
  }
}
class Ne {
  constructor() {
    _(this, "pfbs", []), _(this, "ps", []);
  }
  get_piece_by_key(e) {
    return this.ps.find((t) => {
      let s = t.q_ch()[1];
      return s = [s[0] - 1, s[1] - 1], D(s, k.key_to_coord(e));
    });
  }
  pull_fen(e) {
    this.pfbs.push(e);
  }
  push_fen() {
    this.pfbs.forEach((e) => e(this.get_fen()));
  }
  get_fen() {
    let { hl: e, lh: t } = k, s = [], a = this.ps.map((r) => r.q_ch());
    return e.forEach((r) => {
      let d = "", l = 0;
      t.forEach((o) => {
        let c = a.find((h) => D(h[1], [o, r]));
        c ? (d += (l === 0 ? "" : l) + c[0], l = 0) : l++;
      });
      let f = l === 0 ? "" : l;
      s.push(d + f);
    }), s.join("/");
  }
  pop(e) {
    let t = this.ps.indexOf(e);
    t > -1 && this.ps.splice(t, 1);
  }
  push(e) {
    this.ps.push(e);
  }
  fen(e) {
    let { hl: t, lh: s } = k, a = [], [r] = e.split(" ");
    r.split("/").forEach((o, c) => {
      let h = 0;
      for (let n of o)
        "RNBQKPrnbqkp".includes(n) ? (a.push([n, [s[h], t[c]]]), h += 1) : "12345678".includes(n) && (h += parseInt(n));
    }), a.find((o) => o[0] === "d") || a.push(["d", [4, 4]]);
    let d = [], l = this.ps.slice(0);
    a.filter((o) => {
      let c = l.findIndex((h) => h.q_ch()[0] === o[0]);
      return c === -1 ? !0 : (l.splice(c, 1), !1);
    }).forEach((o) => re.init(o[0])), l = this.ps.slice(0);
    let f = !0;
    for (; f; ) {
      f = !1;
      let o = a.map((c) => {
        let h = l[0], n = 88;
        return l.forEach((p) => {
          let m = p.q_ch();
          if (c[0] === m[0]) {
            let g = L(c[1], m[1]);
            g < n && (n = g, h = p);
          }
        }), { n: c, p_min: h, min: n };
      });
      o.sort((c, h) => c.min - h.min), o.forEach(({ n: c, p_min: h }) => {
        let n = l.indexOf(h);
        if (n > -1) {
          let p = a.indexOf(c);
          a.splice(p, 1), l.splice(n, 1), d.push([h, c]);
        } else
          f = !0;
      });
    }
    l.forEach((o) => o.drop()), d.forEach(([o, c]) => {
      let h = [Math.floor(c[1][0] - 1) / 8, Math.floor(c[1][1] - 1) / 8];
      o.translate(h);
    });
  }
}
const Ke = Math.PI, Pe = Ke / 6;
class Oe {
  constructor() {
    _(this, "_down"), _(this, "_move"), _(this, "_up"), _(this, "d"), _(this, "ds", []);
  }
  set down(e) {
    this._up = void 0, this._down = e;
    const t = this.ds.find((s) => L(s.q_pos(), e) < 1 / 16);
    t && (this.d = t, this.d.on_down(e));
  }
  set move(e) {
    if (this._move = e, this.d)
      this.d.on_drag(e);
    else {
      let t = this.ds.find((s) => L(s.q_pos(), e) < 0.0625);
      t && t.on_hover(e);
    }
  }
  set up(e) {
    this.d && (this._move ? this.d.on_drop(e) : this.d.on_click(e)), this._up = e, this._move = void 0, this._down = void 0, this.d = void 0;
  }
  pop(e) {
    let t = this.ds.indexOf(e);
    t > -1 && this.ds.splice(t, 1);
  }
  push(e) {
    this.ds.push(e);
  }
}
const Se = (i) => i < 0.5 ? 2 * i * i : 1 - Math.pow(-2 * i + 2, 2) / 2;
class oe {
  constructor() {
    _(this, "gaffer_cancel"), _(this, "ps", []), _(this, "_g", () => {
      let e = this;
      return {
        integrate(t, s) {
          e.ps.forEach((a) => {
            if (a._value) {
              a._value[0] = a._value[2], a._value[1] = a._value[3], a._value[4] = a._value[4] + s;
              let r = Se(a._value[4] / a.dur);
              a.twist && (r = a.twist(r)), a._value[2] = a.end[0] * r + a.start[0] * (1 - r), a._value[3] = a.end[1] * r + a.start[1] * (1 - r);
            }
          });
        },
        render(t) {
          e.ps.forEach((s) => s.update([
            s._value[2] * t + s._value[0] * (1 - t),
            s._value[3] * t + s._value[1] * (1 - t)
          ])), e.ps.filter((s) => s._value[4] >= s.dur).forEach((s) => s.update([s.end[0], s.end[1]])), e.ps = e.ps.filter((s) => s._value[4] < s.dur), e.ps.length == 0 && setTimeout(() => {
            var s;
            e.ps.length == 0 && ((s = e.gaffer_cancel) == null || s.call(e));
          });
        }
      };
    });
  }
  pos(e) {
    e.start = [e.start[0], e.start[1]], e.end = [e.end[0], e.end[1]], e._value = [e.start[0], e.start[1], e.start[0], e.start[1], 0], this.ps.push(e), this.ps.length === 1 && this.resume();
  }
  imm_end() {
    var e;
    this.ps.forEach((t) => {
      t.update(t.end);
    }), (e = this.gaffer_cancel) == null || e.call(this), this.ps = [], this.gaffer_cancel = void 0;
  }
  cancel_one(e) {
    let t = this.ps.indexOf(e);
    t > -1 && (e.update(e.end), this.ps.splice(t, 1));
  }
  cancel() {
    var e;
    (e = this.gaffer_cancel) == null || e.call(this), this.ps = [], this.gaffer_cancel = void 0;
  }
  pause() {
    var e;
    (e = this.gaffer_cancel) == null || e.call(this);
  }
  resume() {
    var e;
    this.ps.length > 0 && ((e = this.gaffer_cancel) == null || e.call(this), this.gaffer_cancel = Be(this._g()));
  }
}
function Be(i) {
  let e = 0, t = 0.01, s, a = 0, r;
  function d(l) {
    l /= 1e3;
    let f = l - (s ?? l - t);
    for (f > 0.25 && (f = 0.25), s = l, a += f; a >= t; )
      i.integrate(e, t), e += t, a -= t;
    const o = a / t;
    i.render(o), r = requestAnimationFrame(d);
  }
  return r = requestAnimationFrame(d), () => {
    cancelAnimationFrame(r);
  };
}
function L(i, e) {
  let t = i[0], s = i[1], a = e[0], r = e[1], d = a - t, l = r - s;
  return Math.sqrt(d * d + l * l);
}
const b = { ctrl: !1, alt: !1, shift: !1 }, O = new xe(), F = new oe(), y = new oe(), M = new Oe(), q = new Ne(), P = new Le(), Q = new $e(), I = new qe(), E = new Ae(), k = new Ee(), S = Ce.init(), x = be.init(), $ = new ke(), he = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const B = class B {
  constructor(e) {
    this.el = e;
  }
};
j(B, "init", () => {
  let e = document.createElement("div");
  e.className = "under";
  let t = document.createElement("div");
  t.className = "fen-wrap";
  let s = document.createElement("label");
  s.textContent = "FEN";
  let a = document.createElement("input");
  return a.type = "text", a.value = he, a.addEventListener("click", () => {
    a.select();
  }), t.appendChild(s), t.appendChild(a), e.appendChild(t), document.createElement("input"), new B(e);
});
let J = B;
const R = class R {
  constructor(e, t) {
    this.el = e, this.ss = t;
  }
  init() {
    this.ss.init(), this.ss.fen(he);
  }
};
j(R, "init", () => {
  let e = document.createElement("div");
  e.className = "analysis-wrap";
  let t = Me.init();
  e.appendChild(t.el);
  let s = J.init();
  return e.appendChild(s.el), new R(e, t);
});
let V = R;
function ze(i) {
  let e = V.init();
  duckchess24.socket = duckchess24.StrongSocket.init("analysis", {
    receive: (s, a) => {
      console.log(s, a);
    }
  }), document.getElementsByTagName("main")[0].appendChild(e.el), e.init();
}
export {
  ze as default
};
