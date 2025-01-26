import { PHPactor } from "../../models/PHPactor.ts";

export interface Command {
  readonly name: string;
  readonly options: ProcessOptions;
  readonly process: Process;
  readonly commands: CommandsRegistry;
  phpactor: PHPactor;

  run(editor: TextEditor): void;
}
