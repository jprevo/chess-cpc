import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel, PieceTheme } from "../types";

export class AllBlacksCard extends Card {
  public static readonly id: string = "all-blacks";
  public static readonly RemoveAfterDelay = 60000;

  get level(): CardLevel {
    return CardLevel.Skin;
  }

  get name(): string {
    return "Voyage en Nouvelle Zélande";
  }

  get description(): string {
    return "La rédac se prend d'affection pour les All Blacks, et toutes les pièces deviennent noires pendant 60 secondes.";
  }

  async play(engine: Engine): Promise<boolean> {
    engine.setPieceTheme(PieceTheme.AllBlacks);

    setTimeout(() => {
      if (engine.pieceTheme === PieceTheme.AllBlacks) {
        engine.setPieceTheme(PieceTheme.Wikipedia);
      }
    }, AllBlacksCard.RemoveAfterDelay);

    return true;
  }
}
