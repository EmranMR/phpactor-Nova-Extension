import { PHPactor } from "../models/PHPactor.ts";
import { Command } from "./Contracts/Command.ts";
export class CacheClean implements Command {
  readonly name = "cleanCache";

  readonly options: ProcessOptions = { args: ["cache:clear"] };
  process!: Process; // needs the ! due to strict type check
  phpactor: PHPactor;
  readonly commands: CommandsRegistry = nova.commands;

  constructor(phpactor: PHPactor) {
    this.phpactor = phpactor;
    this.commands.register(this.name, this.run, this);
  }
  run(_editor: TextEditor): void {
    this.phpactor.stop();
    this.clean();
    this.phpactor.start();
  }

  private clean() {
    try {
      this.process = new Process(this.phpactor.path(), this.options);
      this.process.start();
      this.phpactor.notify("✅ Cache Successfuly Cleared");
    } catch (_e) {
      this.phpactor.notify(
        "❌ Was unable to clean cache (raise an issue? 🤔)",
      );
    }
  }
}
