import { PHPactor } from "../models/PHPactor.ts";
import { Command } from "./Contracts/Command.ts";
export class CacheClean implements Command {
  readonly name = "cleanCache";

  readonly options: ProcessOptions = { args: ["cache:clear"] };
  readonly process: Process;
  phpactor: PHPactor;
  readonly commands: CommandsRegistry = nova.commands;

  constructor(phpactor: PHPactor) {
    this.phpactor = phpactor;
    this.process = new Process(phpactor.path(), this.options);
    this.commands.register(this.name, this.run, this);
  }
  run(_editor: TextEditor): void {
    this.phpactor.stop();
    this.clean();
    this.phpactor.start();
  }

  private clean() {
    try {
      this.process.start();
      this.phpactor.notify("✅ Cache Cleaned");
    } catch (_e) {
      this.phpactor.notify(
        "❌ Was unable to clean cache (raise an issue? 🤔)",
      );
    }
  }
}
