import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";

export class AckbooCard extends Card {
  public static readonly id: string = "ackboo";
  public static readonly RemoveAfterDelay = 60000;

  protected stopTimeout: ReturnType<typeof setTimeout> | null = null;

  get level(): CardLevel {
    return CardLevel.Skin;
  }

  get name(): string {
    return "Super génie";
  }

  get description(): string {
    return "Votre QI double pendant 60 secondes car vous êtes en présence d'ackboo.";
  }

  async play(engine: Engine): Promise<boolean> {
    const board = engine.boardElement;

    if (!board) {
      return false;
    }

    board.classList.add("ackboo");

    this.stopTimeout = setTimeout(() => {
      if (board) {
        board.classList.remove("ackboo");
      }
    }, AckbooCard.RemoveAfterDelay);

    return true;
  }
}
