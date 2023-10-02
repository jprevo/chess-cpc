import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";
import { BLACK, WHITE } from "chess.js";
import { Util } from "../util";

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
    const passedFen: string = Util.setTurn(
      engine.game.fen(),
      engine.turn === BLACK ? WHITE : BLACK,
    );

    engine.setPosition(passedFen);

    return true;
  }
}
