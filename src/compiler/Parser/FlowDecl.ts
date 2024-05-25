import { Argument } from "compiler/Parser/ParsedHierarchy/Argument";
import { Identifier } from "compiler/Parser/ParsedHierarchy/Identifier";

export class FlowDecl {
  constructor(
    public readonly name: Identifier,
    public readonly args: Argument[],
    public readonly isFunction: boolean
  ) {}
}
