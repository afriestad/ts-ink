import { Path } from "engine/Path";
import { CallStack } from "engine/CallStack";
import { throwNullException } from "engine/NullException";
import { InkObject } from "engine/Object";

export class Choice extends InkObject {
  public text: string = "";
  public index: number = 0;
  public threadAtGeneration: CallStack.Thread | null = null;
  public sourcePath: string = "";
  public targetPath: Path | null = null;
  public isInvisibleDefault: boolean = false;
  public tags: string[] | null = null;
  public originalThreadIndex: number = 0;

  get pathStringOnChoice(): string {
    if (this.targetPath === null)
      return throwNullException("Choice.targetPath");
    return this.targetPath.toString();
  }
  set pathStringOnChoice(value: string) {
    this.targetPath = new Path(value);
  }
}
