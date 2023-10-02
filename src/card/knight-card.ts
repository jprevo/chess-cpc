import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";
import { Color, KNIGHT, PAWN, Square } from "chess.js";

export class KnightCard extends Card {
  public static readonly id: string = "knight";

  get level(): CardLevel {
    return CardLevel.VeryGood;
  }

  get name(): string {
    return "Appel de la cavalerie";
  }

  get description(): string {
    return "Après une formation en maîtrise des chevals, tous vos pions se transforment en Cavaliers.";
  }

  async play(engine: Engine): Promise<boolean> {
    const pieces = engine.game.board();
    const color: Color = engine.turn as Color;

    const pawns: Square[] = [];

    pieces.forEach((line) => {
      if (!line) {
        return;
      }

      line.forEach((piece) => {
        if (!piece) {
          return;
        }

        if (piece.color === color) {
          if (piece.type === PAWN) {
            pawns.push(piece.square);
          }
        }
      });
    });

    if (!pawns.length) {
      return false;
    }

    for (const pawn of pawns) {
      engine.game.remove(pawn);
      engine.game.put(
        {
          type: KNIGHT,
          color: color,
        },
        pawn,
      );
    }

    engine.setPosition(engine.game.fen());

    return true;
  }
}
