"use strict";
import { PHPActor } from "./models/PHPActor.ts";

let langserver: PHPActor | null = null;
export function activate() {
  // Do work when the extension is activated
  langserver = new PHPActor();
}
export function deactivate() {
  // Clean up state before the extension is deactivated
  if (langserver) {
    langserver.deactivate();
    langserver = null;
  }
}
