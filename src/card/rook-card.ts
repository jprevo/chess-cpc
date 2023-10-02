import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";
import { Color, KNIGHT, PAWN, BISHOP, ROOK, Square } from "chess.js";
import { Util } from "../util";

export class RookCard extends Card {
  public static readonly id: string = "rook";

  get level(): CardLevel {
    return CardLevel.Good;
  }

  get name(): string {
    return "33 tours";
  }

  get description(): string {
    return "Un de vos pions, cavaliers ou fous se transforme en tour.";
  }

  async play(engine: Engine): Promise<boolean> {
    const pieces = engine.game.board();
    const color: Color = engine.turn as Color;

    const toTransform: Square[] = [];

    pieces.forEach((line) => {
      if (!line) {
        return;
      }

      line.forEach((piece) => {
        if (!piece) {
          return;
        }

        if (piece.color === color) {
          if (
            piece.type === PAWN ||
            piece.type === KNIGHT ||
            piece.type === BISHOP
          ) {
            toTransform.push(piece.square);
          }
        }
      });
    });

    if (!toTransform.length) {
      return false;
    }

    Util.shuffle(toTransform);
    const piece: Square = toTransform[0];

    engine.game.remove(piece);
    engine.game.put(
      {
        type: ROOK,
        color: color,
      },
      piece,
    );

    engine.setPosition(engine.game.fen());

    return true;
  }
}
