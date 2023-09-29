import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";
import { PAWN, QUEEN } from "chess.js";

export class QueensCard extends Card {
  public static readonly id: string = "queens";

  get level(): CardLevel {
    return CardLevel.VeryGood;
  }

  get name(): string {
    return "Le Jeu de la dame";
  }

  get description(): string {
    return "C'est la révolution, le peuple prend le pouvoir ! Tous vos pions deviennent des reines.";
  }

  async play(engine: Engine): Promise<boolean> {
    const pieces = engine.game.board();
    const color: string = engine.turn;

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
            engine.game.remove(piece.square);
            engine.game.put(
              {
                type: QUEEN,
                color: color,
              },
              piece.square,
            );
          }
        }
      });
    });

    engine.setPosition(engine.game.fen());

    return true;
  }
}
