import { Card } from "./card";
import { Engine } from "../engine";

export class PartyCard extends Card {
  public static readonly id: string = "party";

  async play(engine: Engine): Promise<void> {
    const board: HTMLElement | null = document.getElementById("board");

    if (!board) {
      return;
    }

    board.classList.toggle("party");

    return;
  }
}
