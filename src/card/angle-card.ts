import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel, PieceTheme } from "../types";

export class AngleCard extends Card {
  public static readonly id: string = "angle";
  public static readonly RemoveAfterDelay = 60000;

  get level(): CardLevel {
    return CardLevel.Skin;
  }

  get name(): string {
    return "Think outside the box";
  }

  get description(): string {
    return "Changez vos habitudes. Pensez différemment. Soyez unique. Échiquier tourné à 90° pendant 60 secondes.";
  }

  async play(engine: Engine): Promise<boolean> {
    const board: HTMLElement | null = engine.boardElement;

    if (!board) {
      return false;
    }

    board.classList.add("angle");

    setTimeout(() => {
      if (board) {
        board.classList.remove("angle");
      }
    }, AngleCard.RemoveAfterDelay);

    return true;
  }
}
