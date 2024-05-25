import { Container as RuntimeContainer } from "engine/Container";
import { INamedContent } from "engine/INamedContent";
import { IWeavePoint } from "compiler/Parser/ParsedHierarchy/IWeavePoint";
import { ParsedObject } from "compiler/Parser/ParsedHierarchy/Object";
import { InkObject as RuntimeObject } from "engine/Object";
import { Story } from "compiler/Parser/ParsedHierarchy/Story";
import { SymbolType } from "compiler/Parser/ParsedHierarchy/SymbolType";
import { Identifier } from "compiler/Parser/ParsedHierarchy/Identifier";

export class Gather extends ParsedObject implements INamedContent, IWeavePoint {
  get name(): string | null {
    return this.identifier?.name || null;
  }
  public identifier?: Identifier;

  get runtimeContainer(): RuntimeContainer {
    return this.runtimeObject as RuntimeContainer;
  }

  constructor(
    identifier: Identifier | null,
    public readonly indentationDepth: number
  ) {
    super();

    if (identifier) this.identifier = identifier;
  }

  get typeName(): string {
    return "Gather";
  }

  public readonly GenerateRuntimeObject = (): RuntimeObject => {
    const container = new RuntimeContainer();
    container.name = this.name;

    if (this.story.countAllVisits) {
      container.visitsShouldBeCounted = true;
    }

    container.countingAtStartOnly = true;

    // A gather can have null content, e.g. it's just purely a line with "-"
    if (this.content) {
      for (const c of this.content) {
        container.AddContent(c.runtimeObject);
      }
    }

    return container;
  };

  public ResolveReferences(context: Story): void {
    super.ResolveReferences(context);

    if (this.identifier && (this.identifier.name || "").length > 0) {
      context.CheckForNamingCollisions(
        this,
        this.identifier,
        SymbolType.SubFlowAndWeave
      );
    }
  }

  public readonly toString = (): string =>
    `- ${this.identifier?.name ? "(" + this.identifier?.name + ")" : "gather"}`;
}
