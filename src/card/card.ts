import { Engine } from "../engine";
import { CardLevel } from "../types";

export abstract class Card {
  public static readonly id: string = "abstract";

  get name(): string {
    return "Unknown";
  }

  get description(): string {
    return "Unknown";
  }

  get level(): CardLevel {
    return CardLevel.Good;
  }

  get help(): string | null {
    return null;
  }

  abstract play(engine: Engine): Promise<boolean>;
}
