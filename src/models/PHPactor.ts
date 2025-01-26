import { CacheClean } from "../Commands/CleanCache.ts";
import { Path } from "./Path.ts";
export class PHPactor {
  #url =
    "https://github.com/phpactor/phpactor/releases/latest/download/phpactor.phar";
  #workspacePath = nova.workspace.path;
  #fs: FileSystem = nova.fs;
  // octal
  #filePremission = 0o711;
  languageClient: LanguageClient | null = null;
  #path: Path;

  readonly #name = "phpactor";

  constructor() {
    this.#path = new Path();
    if (this.#path.lspExists()) {
      this.start();
    } else {
      this.makeLSP();
      this.start();
    }

    this.registerCommands();
  }

  private registerCommands() {
    new CacheClean(this);
  }

  start() {
    if (this.languageClient) {
      this.languageClient.stop();
      nova.subscriptions.remove(this.languageClient);
    }
    // Create the client
    const client = new LanguageClient(
      "PHPactor",
      "PHPactor Language Server",
      this.serverOptions(),
      this.clientOptions(),
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

  private clientOptions() {
    return {
      syntaxes: ["php"],
    };
  }

  private serverOptions() {
    return {
      args: ["language-server", "-d", `${this.#workspacePath}`],
      path: this.path(),
    };
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

  private async fetchBin(): Promise<ArrayBuffer | undefined> {
    try {
      const response = await fetch(this.#url);
      this.notify("✅ phpactor Successfuly Downloaded");
      if (!response.ok) {
        this.notify("❌ Download Failed");
        throw new Error(`Response status: ${response.status}`);
      }
      return await response.arrayBuffer();
    } catch (e) {
      console.error(e);
    }
  }

  private async makeLSP() {
    this.#path.makeBinDir();
    try {
      const file = this.#fs.open(this.path(), "wb");

      const buffer = await this.fetchBin();
      if (buffer) {
        file.write(buffer);
      }

      file.close();
      this.#fs.chmod(this.path(), this.#filePremission);
      this.notify("✅ LSP is successfully installed");
    } catch (e) {
      this.notify("❌ Could Not Install");
      console.error(e);
    }
  }

  public path(): string {
    return this.#path.getBinPath(this.#name);
  }

  public notify(message: string) {
    const request = new NotificationRequest();

    request.title = nova.localize("PHPactor Extension");
    request.body = nova.localize(message);
    nova.notifications.add(request);
  }
}
