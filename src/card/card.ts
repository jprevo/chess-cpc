import { Engine } from "../engine";

export abstract class Card {
  public static readonly id: string = "abstract";

  get name(): string {
    return "Unknown";
  }

  get description(): string {
    return "Unknown";
  }

  abstract play(engine: Engine): Promise<void>;
}
