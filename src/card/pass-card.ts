import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";
import { BLACK, WHITE } from "chess.js";

export class PassCard extends Card {
  public static readonly id: string = "pass";

  get level(): CardLevel {
    return CardLevel.VeryBad;
  }

  get name(): string {
    return "Puisque c'est comme ça je boude";
  }

  get description(): string {
    return "Vous passez votre tour.";
  }

  async play(engine: Engine): Promise<boolean> {
    const fen: string = engine.game.fen();

    const parts: string[] = fen.split(" ");
    parts[1] = engine.turn === BLACK ? WHITE : BLACK;
    parts[3] = "-"; // en passant flag

    const passedFen: string = parts.join(" ");

    engine.setPosition(passedFen);

    return true;
  }
}
