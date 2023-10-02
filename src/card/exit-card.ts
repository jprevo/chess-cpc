import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";
import { BISHOP, Color, KNIGHT, PAWN, Square } from "chess.js";
import { Util } from "../util";

export class ExitCard extends Card {
  public static readonly id: string = "exit";

  get level(): CardLevel {
    return CardLevel.VeryBad;
  }

  get name(): string {
    return "Démission";
  }

  get description(): string {
    return "Un de vos pions, cavaliers ou fous va élever des moutons dans la Creuse et disparaît de l'échiquier.";
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
          if ([PAWN, BISHOP, KNIGHT].includes(piece.type)) {
            toRemove.push(piece.square);
          }
        }
      });
    });

    if (!toRemove.length) {
      return false;
    }

    Util.shuffle(toRemove);

    engine.game.remove(toRemove[0]);
    engine.setPosition(engine.game.fen());

    return true;
  }
}
