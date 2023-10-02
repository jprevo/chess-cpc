import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";

export class PartyCard extends Card {
  public static readonly id: string = "party";
  public static readonly RemoveAfterDelay = 60000;

  protected stopTimeout: ReturnType<typeof setTimeout> | null = null;

  get level(): CardLevel {
    return CardLevel.Skin;
  }

  get name(): string {
    return "Super fête !";
  }

  get description(): string {
    return "Grosse ambiance à la salle des fêtes de Meulin ce soir ! Mode boom pendant 60 secondes.";
  }

  async play(engine: Engine): Promise<boolean> {
    const board: HTMLElement | null = engine.boardElement;

    if (!board) {
      return false;
    }

    board.classList.add("party");

    this.stopTimeout = setTimeout(() => {
      if (board) {
        board.classList.remove("party");
      }
    }, PartyCard.RemoveAfterDelay);

    return true;
  }
}
