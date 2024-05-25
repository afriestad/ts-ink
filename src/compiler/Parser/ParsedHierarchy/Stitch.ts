import { Argument } from "compiler/Parser/ParsedHierarchy/Argument";
import { FlowBase } from "compiler/Parser/ParsedHierarchy/Flow/FlowBase";
import { FlowLevel } from "compiler/Parser/ParsedHierarchy/Flow/FlowLevel";
import { Identifier } from "compiler/Parser/ParsedHierarchy/Identifier";
import { ParsedObject } from "compiler/Parser/ParsedHierarchy/Object";

export class Stitch extends FlowBase {
  get flowLevel(): FlowLevel {
    return FlowLevel.Stitch;
  }

  constructor(
    name: Identifier,
    topLevelObjects: ParsedObject[],
    args: Argument[],
    isFunction: boolean
  ) {
    super(name, topLevelObjects, args, isFunction);
  }

  get typeName(): string {
    return "Stitch";
  }

  public toString = (): string => {
    return `${
      this.parent !== null ? this.parent + " > " : ""
    }${this.toString()}`;
  };
}
