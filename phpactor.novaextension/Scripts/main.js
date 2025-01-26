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

// src/Commands/CleanCache.ts
var CacheClean = class {
  name = "cleanCache";
  options = { args: ["cache:clear"] };
  process;
  phpactor;
  commands = nova.commands;
  constructor(phpactor) {
    this.phpactor = phpactor;
    this.process = new Process(phpactor.path(), this.options);
    this.commands.register(this.name, this.run, this);
  }
  run(_editor) {
    this.phpactor.stop();
    this.clean();
    this.phpactor.start();
  }
  clean() {
    try {
      this.process.start();
      this.phpactor.notify("\u2705 Cache Cleaned");
    } catch (_e) {
      this.phpactor.notify(
        "\u274C Was unable to clean cache (raise an issue? \u{1F914})"
      );
    }
  }
};

// src/models/Path.ts
var Path = class {
  home;
  #fs = nova.fs;
  #local;
  #localBin;
  constructor() {
    this.home = nova.path.normalize("~");
    this.#local = `${this.home}/.local`;
    this.#localBin = `${this.#local}/bin`;
  }
  lspExists() {
    return this.alreadyDownloaded();
  }
  alreadyDownloaded() {
    return this.#fs.listdir(`${this.home}/.local/bin`).includes("phpactor");
  }
  directoryExists(path) {
    return this.#fs.access(`${path}`, this.#fs.F_OK);
  }
  makeBinDir() {
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
  getBinPath(binName) {
    return `${this.#localBin}/${binName}`;
  }
};

// src/models/PHPactor.ts
var PHPactor = class {
  #url = "https://github.com/phpactor/phpactor/releases/latest/download/phpactor.phar";
  #workspacePath = nova.workspace.path;
  #fs = nova.fs;
  // octal
  #filePremission = 457;
  languageClient = null;
  #path;
  #name = "phpactor";
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
  registerCommands() {
    new CacheClean(this);
  }
  start() {
    if (this.languageClient) {
      this.languageClient.stop();
      nova.subscriptions.remove(this.languageClient);
    }
    const client = new LanguageClient(
      "PHPactor",
      "PHPactor Language Server",
      this.serverOptions(),
      this.clientOptions()
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
  clientOptions() {
    return {
      syntaxes: ["php"]
    };
  }
  serverOptions() {
    return {
      args: ["language-server", "-d", `${this.#workspacePath}`],
      path: this.path()
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
  async fetchBin() {
    try {
      const response = await fetch(this.#url);
      this.notify("\u2705 phpactor Successfuly Downloaded");
      if (!response.ok) {
        this.notify("\u274C Download Failed");
        throw new Error(`Response status: ${response.status}`);
      }
      return await response.arrayBuffer();
    } catch (e) {
      console.error(e);
    }
  }
  async makeLSP() {
    this.#path.makeBinDir();
    try {
      const file = this.#fs.open(this.path(), "wb");
      const buffer = await this.fetchBin();
      if (buffer) {
        file.write(buffer);
      }
      file.close();
      this.#fs.chmod(this.path(), this.#filePremission);
      this.notify("\u2705 LSP is successfully installed");
    } catch (e) {
      this.notify("\u274C Could Not Install");
      console.error(e);
    }
  }
  path() {
    return this.#path.getBinPath(this.#name);
  }
  notify(message) {
    const request = new NotificationRequest();
    request.title = nova.localize("PHPactor Extension");
    request.body = nova.localize(message);
    nova.notifications.add(request);
  }
};

// src/main.ts
var langserver = null;
function activate() {
  langserver = new PHPactor();
}
function deactivate() {
  if (langserver) {
    langserver.deactivate();
    langserver = null;
  }
}
