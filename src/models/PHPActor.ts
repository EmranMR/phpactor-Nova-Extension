import { Path } from "./Path.ts";
export class PHPActor {
  #url =
    "https://github.com/phpactor/phpactor/releases/latest/download/phpactor.phar";
  #extensionPath: string;
  #fs = nova.fs;

  constructor() {
    const path = new Path();
    this.#extensionPath = path.extension;

    if (!path.lspExists()) {
      console.log("hello");
      this.makeBin();
      let file = this.#fs.open(
        `${this.#extensionPath}/bin/phpactor.phar`,
        "wb",
      );
    }
  }

  public async fetch() {
    try {
      const response = await fetch(this.#url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (e) {
      console.error(e);
    }
  }
  private makeBin(): void {
    try {
      this.#fs.mkdir(`${this.#extensionPath}/bin`);
    } catch (error) {
      console.error(error);
    }
  }
  public run(): void {}
}
