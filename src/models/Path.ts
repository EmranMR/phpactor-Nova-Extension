export class Path {
  extension: string;
  home: string;
  #fileSystem: FileSystem = nova.fs;

  constructor() {
    this.extension = nova.extension.path;
    this.home = nova.path.normalize("~");
  }

  public lspExists(): boolean {
    return this.alreadyDownloaded();
  }

  private alreadyDownloaded(): boolean {
    return this.#fileSystem.listdir(this.extension).includes("bin");
  }
}
