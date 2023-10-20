const c = (n, e = {}) => (e = e || {}, "" + "/assets/" + n), i = (n) => `compiled/${n}${document.body.dataset.dev ? "" : ".min"}.js`;
async function l(n, e) {
  const d = await import(c(i(n), e == null ? void 0 : e.url));
  return d.initModule ? d.initModule(e == null ? void 0 : e.init) : d.default(e == null ? void 0 : e.init);
}
const a = () => {
  const n = window.duckchess24;
  n.loadEsm = l;
};
a();
