import { ListDefinition } from "compiler/Parser/ParsedHierarchy/List/ListDefinition";
import { ParsedObject } from "compiler/Parser/ParsedHierarchy/Object";
import { InkObject as RuntimeObject } from "engine/Object";
import { Story } from "compiler/Parser/ParsedHierarchy/Story";
import { SymbolType } from "compiler/Parser/ParsedHierarchy/SymbolType";
import { Identifier } from "compiler/Parser/ParsedHierarchy/Identifier";

export class ListElementDefinition extends ParsedObject {
  public seriesValue: number = 0;

  public parent: ListDefinition | null = null;

  get fullName(): string {
    const parentList = this.parent;
    if (parentList === null) {
      throw new Error("Can't get full name without a parent list.");
    }

    return `${parentList.identifier?.name}.${this.name}`;
  }

  get typeName(): string {
    return "ListElement";
  }

  get name(): string | null {
    return this.indentifier?.name || null;
  }

  constructor(
    public readonly indentifier: Identifier,
    public readonly inInitialList: boolean,
    public readonly explicitValue: number | null = null
  ) {
    super();
  }

  public readonly GenerateRuntimeObject = (): RuntimeObject => {
    throw new Error("Not implemented.");
  };

  public ResolveReferences(context: Story): void {
    super.ResolveReferences(context);
    context.CheckForNamingCollisions(
      this,
      this.indentifier,
      SymbolType.ListItem
    );
  }

  public readonly toString = (): string => this.fullName;
}
