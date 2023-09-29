import { Card } from "./card";
import { Engine } from "../engine";

export class PartyCard extends Card {
  public static readonly id: string = "party";
  public static readonly RemoveAfterDelay = 3000;

  protected stopTimeout: ReturnType<typeof setTimeout> | null = null;

  get name(): string {
    return "Super fête !";
  }

  get description(): string {
    return "Grosse ambiance à la salle des fêtes de Meulin ce soir ! Mode boom pendant 60 secondes.";
  }

  async play(engine: Engine): Promise<void> {
    const board = engine.boardElement;

    if (!board) {
      return;
    }

    board.classList.add("party");

    this.stopTimeout = setTimeout(() => {
      if (board) {
        board.classList.remove("party");
      }
    }, PartyCard.RemoveAfterDelay);

    return;
  }
}
