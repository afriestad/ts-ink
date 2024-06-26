import { Glue as RuntimeGlue } from "engine/Glue";
import { Wrap } from "compiler/Parser/ParsedHierarchy/Wrap";

export class Glue extends Wrap<RuntimeGlue> {
  constructor(glue: RuntimeGlue) {
    super(glue);
  }

  get typeName(): string {
    return "Glue";
  }
}
