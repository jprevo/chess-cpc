import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";

export class VomitCard extends Card {
  public static readonly id: string = "vomit";
  public static readonly RemoveAfterDelay = 60000;

  protected stopTimeout: ReturnType<typeof setTimeout> | null = null;

  get level(): CardLevel {
    return CardLevel.Skin;
  }

  get name(): string {
    return "Tu t'es bu quand t'as vu ?";
  }

  get description(): string {
    return "Vous avez pris un verre en trop et en payez les conséquences pendant 60 secondes.";
  }

  async play(engine: Engine): Promise<boolean> {
    const board: HTMLElement | null = engine.boardElement;

    if (!board) {
      return false;
    }

    board.classList.add("vomit");

    this.stopTimeout = setTimeout(() => {
      if (board) {
        board.classList.remove("vomit");
      }
    }, VomitCard.RemoveAfterDelay);

    return true;
  }
}
