export class Path {
  home: string;
  #fs: FileSystem = nova.fs;

  readonly #local: string;
  readonly #localBin: string;

  constructor() {
    this.home = nova.path.normalize("~");
    this.#local = `${this.home}/.local`;
    this.#localBin = `${this.#local}/bin`;
  }

  public lspExists(): boolean {
    return this.alreadyDownloaded();
  }

  private alreadyDownloaded(): boolean {
    return this.#fs
      .listdir(`${this.home}/.local/bin`)
      .includes("phpactor");
  }

  private directoryExists(path: string): boolean {
    return this.#fs.access(`${path}`, this.#fs.F_OK);
  }

  public makeBinDir() {
    if (this.directoryExists(this.#localBin)) {
      return;
    } else {
      try {
        this.#fs.mkdir(this.#localBin);
      } catch (e) {
        console.error(e);
      }
    }
  }

  public getBinPath(binName: string) {
    return `${this.#localBin}/${binName}`;
  }
}
