import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";
import { Color, KING, Square } from "chess.js";
import { Util } from "../util";

export class LossCard extends Card {
  public static readonly id: string = "loss";

  get level(): CardLevel {
    return CardLevel.VeryBad;
  }

  get name(): string {
    return "Besoin de changement";
  }

  get description(): string {
    return "Trois de vos pièces en ont marre des échecs et vont jouer au go. Vous perdrez 3 pièces au hasard.";
  }

  async play(engine: Engine): Promise<boolean> {
    const pieces = engine.game.board();
    const color: Color = engine.turn as Color;

    const toRemove: Square[] = [];

    pieces.forEach((line) => {
      if (!line) {
        return;
      }

      line.forEach((piece) => {
        if (!piece) {
          return;
        }

        if (piece.color === color) {
          if (piece.type !== KING) {
            toRemove.push(piece.square);
          }
        }
      });
    });

    if (!toRemove.length) {
      return false;
    }

    Util.shuffle(toRemove);

    let n = 0;

    for (const remove of toRemove) {
      engine.game.remove(remove);

      if (++n >= 3) {
        break;
      }
    }

    engine.setPosition(engine.game.fen());

    return true;
  }
}
