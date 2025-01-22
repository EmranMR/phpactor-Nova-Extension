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
    return this.#fileSystem.listdir(this.extension).includes("bin");
  }
};

// src/models/PHPActor.ts
var PHPActor = class {
  #url = "https://github.com/phpactor/phpactor/releases/latest/download/phpactor.phar";
  #path;
  #fs = nova.fs;
  constructor() {
    this.#path = new Path();
    if (!this.#path.lspExists()) {
      console.log("hello");
      let file = this.#fs.open(
        `${this.#path.extension}/bin/text.txt`,
        "w"
      );
    }
  }
  async fetch() {
    try {
      const response = await fetch(this.#url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (e) {
      console.error(e);
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
