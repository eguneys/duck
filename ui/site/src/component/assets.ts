type AssetUrlOpts = {}

export const assetUrl = (path: string, opts: AssetUrlOpts = {}) => {
  opts = opts || {};

  const baseUrl = ''
  return baseUrl + '/assets'  + '/' + path
}


export const jsModule = (name: string) => `compiled/${name}${document.body.dataset.dev ? '': '.min'}.js`


export async function loadEsm<T, ModuleOpts = any>(
  name: string,
  opts?: { init?: ModuleOpts; url?: AssetUrlOpts },
): Promise<T> {

  const module = await import(assetUrl(jsModule(name), opts?.url))
  return module.initModule ? module.initModule(opts?.init) : module.default(opts?.init)
}