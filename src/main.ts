"use strict";
const lspURL =
  "https://github.com/phpactor/phpactor/releases/latest/download/phpactor.phar";
let langserver: ExampleLanguageServer | null = null;
export function activate() {
  // Do work when the extension is activated
  getLSP();
  langserver = new ExampleLanguageServer();
}
export function deactivate() {
  // Clean up state before the extension is deactivated
  if (langserver) {
    langserver.deactivate();
    langserver = null;
  }
}
class ExampleLanguageServer {
  languageClient: any;
  constructor() {
    // Observe the configuration setting for the server's location, and restart the server on change
    nova.config.observe(
      "example.language-server-path",
      function (path: string) {
        this.start(path);
      },
      this,
    );
  }
  deactivate() {
    this.stop();
  }
  start(path: string) {
    if (this.languageClient) {
      this.languageClient.stop();
      nova.subscriptions.remove(this.languageClient);
    }
    // Use the default server path
    if (!path) {
      path = "/usr/local/bin/example";
    }
    // Create the client
    const serverOptions = {
      path: path,
    };
    const clientOptions = {
      // The set of document syntaxes for which the server is valid
      syntaxes: ["javascript"],
    };
    const client = new LanguageClient(
      "example-langserver",
      "Example Language Server",
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
}
async function getLSP() {
  try {
    const response = await fetch(lspURL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (e) {
    console.error(e);
  }
}
