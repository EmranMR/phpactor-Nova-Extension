"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(main_exports);

// src/models/Path.ts
var Path = class {
  extension;
  home;
  #fileSystem = nova.fs;
  constructor() {
    this.extension = nova.extension.path;
    this.home = nova.path.normalize("~");
  }
  lspExists() {
    return this.alreadyDownloaded();
  }
  alreadyDownloaded() {
    return this.#fileSystem.listdir(this.extension).includes("bin");
  }
};

// src/models/PHPActor.ts
var PHPActor = class {
  #url = "https://github.com/phpactor/phpactor/releases/latest/download/phpactor.phar";
  #extensionPath;
  #fs = nova.fs;
  // octal
  #filePremission = 457;
  languageClient = null;
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
    const serverOptions = {
      path: this.getPath()
    };
    const clientOptions = {
      // The set of document syntaxes for which the server is valid
      syntaxes: ["php"]
    };
    const client = new LanguageClient(
      "phpactor",
      "phpactor Language Server",
      serverOptions,
      clientOptions
    );
    try {
      client.start();
      nova.subscriptions.add(client);
      this.languageClient = client;
    } catch (err) {
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
  getPath() {
    return `${this.#extensionPath}/bin/phpactor`;
  }
  async fetchBin() {
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
  async makeLSP() {
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
  makeBinDir() {
    try {
      this.#fs.mkdir(`${this.#extensionPath}/bin`);
    } catch (error) {
      console.error(error);
    }
  }
  run() {
  }
};

// src/main.ts
var langserver = null;
function activate() {
  const phpactor = new PHPActor();
  phpactor.run();
}
function deactivate() {
  if (langserver) {
    langserver.deactivate();
    langserver = null;
  }
}
