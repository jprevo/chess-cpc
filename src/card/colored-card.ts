import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel, PieceTheme } from "../types";

export class ColoredCard extends Card {
  public static readonly id: string = "colored";
  public static readonly RemoveAfterDelay = 60000;

  get level(): CardLevel {
    return CardLevel.Skin;
  }

  get name(): string {
    return "Non au manichéisme";
  }

  get description(): string {
    return "Marre de tout voir en blanc et noir ? Mode coloré pendant 60 secondes.";
  }

  async play(engine: Engine): Promise<boolean> {
    engine.setPieceTheme(PieceTheme.Colored);

    setTimeout(() => {
      engine.setPieceTheme(PieceTheme.Wikipedia);
    }, ColoredCard.RemoveAfterDelay);

    return true;
  }
}
