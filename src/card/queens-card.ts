import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";
import { Color, PAWN, QUEEN, Square } from "chess.js";

export class QueensCard extends Card {
  public static readonly id: string = "queens";

  get level(): CardLevel {
    return CardLevel.VeryGood;
  }

  get name(): string {
    return "Le Jeu de la Dame";
  }

  get description(): string {
    return "Un de vos pions a lu le Manifeste Communiste et s'extrait de sa condition pour devenir une reine.";
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

    const pawn: Square = pawns[Math.floor(Math.random() * pawns.length)];

    engine.game.remove(pawn);
    engine.game.put(
      {
        type: QUEEN,
        color: color,
      },
      pawn,
    );

    engine.setPosition(engine.game.fen());

    return true;
  }
}
