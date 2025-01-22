// Inspired by https://github.com/sgwilym/nova-deno
/// <reference lib="deno.ns" />

import * as esbuild from "https://deno.land/x/esbuild@v0.19.2/mod.js";
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.8.2/mod.ts";
import { resolve } from "https://deno.land/std@0.187.0/path/mod.ts";

esbuild
  .build({
    plugins: [
      ...denoPlugins({
        configPath: resolve("deno.json"),
      }),
    ],
    entryPoints: ["./src/main.ts"],
    outfile: "./phpactor.novaextension/Scripts/main.js",
    format: "cjs",
    bundle: true,
  })
  .then(() => {
    console.log("Success!");
    Deno.exit(0);
  })
  .catch((error) => {
    console.error(error);
    Deno.exit(1);
  });
