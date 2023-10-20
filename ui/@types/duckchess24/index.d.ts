
interface Duckchess24 {

  loadEsm<T, ModuleOpts = any>(name: string, opts?: { init? : ModuleOpts, url?: AssetUrlOpts }): Promise<T>;
}

interface AssetUrlOpts {
  sameDomain?: boolean;
  noVersion?: boolean;
  version?: string;
}

interface Window {
  duckchess24: Duckchess24;
}

declare const duckchess24: Duckchess24;