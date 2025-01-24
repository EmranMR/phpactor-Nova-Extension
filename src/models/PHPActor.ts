import { Path } from "./Path.ts";
export class PHPactor {
  #url =
    "https://github.com/phpactor/phpactor/releases/latest/download/phpactor.phar";
  #extensionPath: string;
  #workspacePath = nova.workspace.path;
  #fs: FileSystem = nova.fs;
  // octal
  #filePremission = 0o711;
  languageClient: LanguageClient | null = null;

  constructor() {
    const path = new Path();
    this.#extensionPath = path.extension;

    if (path.lspExists()) {
      this.start();
    } else {
      this.makeLSP();
    }
  }

  start() {
    if (this.languageClient) {
      this.languageClient.stop();
      nova.subscriptions.remove(this.languageClient);
    }
    // Create the client
    const serverOptions = {
      args: ["language-server", "-d", `${this.#workspacePath}`],
      path: this.getPath(),
    };
    const clientOptions = {
      // The set of document syntaxes for which the server is valid
      // debug: true,
      syntaxes: ["php"],
    };
    const client = new LanguageClient(
      "PHPactor",
      "PHPactor Language Server",
      serverOptions,
      clientOptions,
    );
    try {
      // Start the client
      client.start();
      // Add the client to the subscriptions to be cleaned up
      nova.subscriptions.add(client);
      this.languageClient = client;
    } catch (err) {
      // If the .start() method throws, it's likely because the path to the language server is invalid
      if (nova.inDevMode()) {
        console.error(err);
      }
    }
  }

  stop() {
    if (this.languageClient) {
      this.languageClient.stop();
      nova.subscriptions.remove(this.languageClient);
      this.languageClient = null;
    }
  }

  deactivate() {
    this.stop();
  }

  public getPath(): string {
    return `${this.#extensionPath}/bin/phpactor`;
  }

  private async fetchBin(): Promise<ArrayBuffer | undefined> {
    try {
      const response = await fetch(this.#url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.arrayBuffer();
    } catch (e) {
      console.error(e);
    }
  }

  private async makeLSP() {
    this.makeBinDir();

    try {
      const file = this.#fs.open(this.getPath(), "wb");

      const buffer = await this.fetchBin();
      if (buffer) {
        file.write(buffer);
      }

      file.close();
      this.#fs.chmod(this.getPath(), this.#filePremission);
    } catch (e) {
      console.error(e);
    }
  }

  private makeBinDir(): void {
    try {
      this.#fs.mkdir(`${this.#extensionPath}/bin`);
    } catch (error) {
      console.error(error);
    }
  }
  public run(): void {}
}
