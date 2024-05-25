import { ParsedObject } from "compiler/Parser/ParsedHierarchy/Object";

export type FindQueryFunc<T extends ParsedObject> = (obj: T) => boolean;
