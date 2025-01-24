"use strict";
import { PHPactor } from "./models/PHPActor.ts";

let langserver: PHPactor | null = null;
export function activate() {
  // Do work when the extension is activated
  langserver = new PHPactor();
}
export function deactivate() {
  // Clean up state before the extension is deactivated
  if (langserver) {
    langserver.deactivate();
    langserver = null;
  }
}
